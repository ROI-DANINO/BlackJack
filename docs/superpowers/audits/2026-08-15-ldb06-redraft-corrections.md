# LDB-06 redraft — correction checklist

**Date:** 2026-08-15
**Source records:** `journal/raw/_inbox/2026-08-15-ldb06-redraft-examiner/audit/` — instance A
(`2026-08-15-ldb06-redraft-claim-audit.md`, 29 claims) and instance B
(`2026-08-15-ldb06-composition-audit.md`, 18 compositions). Both are RAW under Inbox Rule 0: data and
evidence, never authority.
**Target under repair:** `docs/superpowers/specs/2026-08-08-session-composition.md` (LDB-06, DRAFT,
1254 lines), plus one locus in `AGENTS.md`.

> **Nothing here is confirmed.** Both passes were *examiners*, not verifiers. No independent instance
> has re-checked their verdicts. Eight rows below (marked ✔ **owner-checked**) were re-checked
> first-hand against the raw files during the report-back; the rest carry the examiner's reading only.
> There are **no `Remove` and no `Replace` verdicts** across either pass — no claim in the redraft is
> contradicted outright.

> **Why this file exists.** `AGENTS.md`: *"Corrections do not execute themselves… A correction pass
> ends by checking that its corrections are **in the target file**."* Three research phases in this
> repo produced corrections that reached an audit record and never reached the document. §7 below is
> the check that closes that loop, and it is not optional.

---

## How to read the three groups

The most useful fact in this list is **which items are edits and which are rulings**.

| Group | Count | What it needs |
|---|---|---|
| **1. Text repairs** | 10 | An edit. The ruling does not change. Safe to apply before the gate. |
| **2. Gate rulings** | 13 | **Your decision first**, then an edit. These are the grill inputs. |
| **3. Recorded, no landing loop** | 13 | Nothing. Filed so a later reader does not re-find them. |

---

## Group 1 — text repairs (10). No ruling changes.

Apply these in **descending line order**, or re-grep each anchor before editing: every edit shifts the
line numbers below it.

| # | Defect (one line) | Target file | Line | Repair |
|---|---|---|---|---|
| **RA-15** ✔ | *"`LDB-05` §0.1 names the mechanism **in the owner's own words**"* — that sentence is LDB-05's own prose, not yours. | `docs/superpowers/specs/2026-08-08-session-composition.md` | `522-523` | Drop "in the owner's own words". The habit is named by the spec; the owner-sourced quote at `journal/decisions.md:181-183` says something else. |
| **RA-15b** ✔ | The same misattribution has already propagated into an authority file loaded every session. | `AGENTS.md` | `20` | *"`LDB-05` §0.1 had already named the habit **in the owner's words**"* → "had already named the habit". **Fix this one regardless of how the gate is ruled.** |
| **RA-01** ✔ | The gate was held open on **2026-08-14**, not 2026-08-08 — stated wrongly twice. | `docs/superpowers/specs/2026-08-08-session-composition.md` | `16`, `963` | Change both dates to 2026-08-14, per `journal/decisions.md:569-570`. |
| **RA-14** ✔ | *"`LDB-05` D12 already **licenses**… this is that clause being used rather than a new mechanic"* — the quoted sentence continues *"and they remain a non-binding progression idea **rather than an approved mechanic**"* (`2026-08-04-motivation-and-chips-economy.md:524-527`). | `docs/superpowers/specs/2026-08-08-session-composition.md` | `513-514`, `1022-1023` | The up-only streak stands as a **product judgement**; delete the claim that LDB-05 pre-licensed it. This is divergence 6's stated ground, so the divergence text moves with it. |
| **RA-03** | *"`LDB-09` **may** change the Activity type set, which **would** add rows"* — LDB-09 is approved and did: 6 types → 11 (`2026-08-15-play-verdicts-and-ungraded-activities.md:129`; `2026-08-01-activity-taxonomy.json:174,193,217,239,262`). | `docs/superpowers/specs/2026-08-08-session-composition.md` | `29-31` | Future tense → past. Anticipation becomes a fact, and the fact is larger than "add rows" — see **RC-11** and **RC-03**. |
| **RA-22** | *"All six are approved"* / *"each in §12 with its approval"*, while divergence 2 is struck and superseded by divergence 6, which reverses it. | `docs/superpowers/specs/2026-08-08-session-composition.md` | `964`, `1165` | Say five approved and one superseded, or "all six are disposed". |
| **RA-02** | *"Six divergences… **each with what it costs**"* — divergence 6 (`:1019-1028`) states no cost. §15 criterion 7 correctly claims costs for 1, 4 and 5 only. | `docs/superpowers/specs/2026-08-08-session-composition.md` | `11` | Either state divergence 6's cost or narrow the header claim to match criterion 7. |
| **RA-08** | D2's evidence-label line still enumerates only the 2026-08-08 grounds; the redraft added a new source claim at `:219-225` that carries no label. | `docs/superpowers/specs/2026-08-08-session-composition.md` | `265-267` | Add the `product-vision.md:69-71` re-reading to the label line. `AGENTS.md` evidence rule 4 requires every claim labelled. |
| **RA-11** | The card's requirement is quoted as *"resolve **it** in terms of…"*; `journal/tasks.md:63` reads *"resolve **the contradiction** in terms of…"*. | `docs/superpowers/specs/2026-08-08-session-composition.md` | `317-318` | Quote verbatim. The attribution locus is right this time — this is the F2 seam and it held. |
| **RA-29** | *"**Nothing** in the pass looked at whether the rulings composed"* — no record of the 2026-08-08 pass exists outside §16 itself (A searched `journal/raw/_inbox/**`, 145 files, positively). | `docs/superpowers/specs/2026-08-08-session-composition.md` | `1251` | Weaken to the supportable form: the pass **reported** no composition finding. Relabel, not Revise — the point of §16.1 survives. |

---

## Group 2 — gate rulings (13). Grill inputs; an edit follows your decision.

Ordered by how much of the specification moves if you rule against the current text.

| # | The question you must answer | Attaches to | Line | Alternative locus |
|---|---|---|---|---|
| **D11** ✔ | **Does an Ungraded Activity type consume the bound of a Learning session?** LDB-09 D11 hands this here and declines to choose. LDB-06 as written **implies yes** — D7 bounds by *Presentation*, unqualified, and abandoned and chart-open Presentations already consume it without filling a window. But D7's own commensurability ground assumes such Presentations cannot exist. | **D7** | `454-476`, ground at `469` | D8 `478-547` |
| **RC-01** ✔ | **What selects the shape of a Learning session?** D3's withdrawal removed the only producer of a Closing-run Learning session. D6/D7/D9/D13/D14 assign a goal, a size and a Skill — never a shape — yet shape sets `segmentation`, `feedbackTiming`, Provenance, chart availability and `EvidenceMode`. RC-16 constrains the repair: selection must happen at session start, never partway through. | **D9** | `549-583` | D3 `269-349` |
| **UNOWNED** ✔ | **Can the strategy chart be open during a Table sitting?** D9's table gives a Closing run `Strategy table: none` (`:554`), `:573` says a Table sitting is always a Closing run, `:588` repeats it — against D2 consequence 2 (`:252-253`), divergence 5's precedent argument (`:224`), approved `LDB-05` D9 (`:453-454`), and `docs/specs/product-vision.md:70` naming *"optional table access"* as permitted. **Neither pass adjudicated this** — A raised it after B had finished. | **D9 / D2** | `554`, `573`, `588` vs `252-253` | — |
| **RC-03** ✔ | An Ungraded Activity type inside a Closing run carries `EvidenceMode: 'acquisition'` (`2026-08-15-play-verdicts…:366`) inside an `assessment` session, and reveals in-activity against `deferred-to-debrief`. Both halves of D9 break. | **D9** | `549-583` | — |
| **RC-05** ✔ | A Table sitting ends at cash-out or an empty Wallet. `SessionRecord.closeReason` has no value for either (`web/src/progress/types.ts:129`), and required `budget` carries a `presetId` a sitting has not got (`:130`). §11's *positive* "checked and not owed" list misses it. | **§11 item 1** | `899-906` | D8 `478-547` |
| **RC-07** ✔ | `A-07e`'s named test is *completion rate and return rate by preset*; D17 discards the preset of every session that does not close, and `ProgressAttempt` carries no preset field. §13 tells LDB-08 both new rows close from stored attempts with no new instrument. | **§10 `A-07e`** | `877` | D17 `766-796` |
| **RC-04** | All four Recommender bands are window predicates, so no band can ever select a type that is `primaryFor: []`. Activity-type selection is unowned. | **D14** | `677-709` | — |
| **RC-08** | A learner names a Classification wrongly at a table and acts correctly. D9 forbids mid-hand correction; the debrief's content 1 covers only decisions that *diverged from the oracle*, and the action did not. The one thing they got wrong appears in no replayable content — only as a number, which user story 9 says the debrief must not be. | **D16** | `731-764` | — |
| **RC-06** | The up-only streak punishes one way of ending. Close the tab: no `SessionRecord` exists, so nothing rises. Tap "stop": it does. D8's own rule is that stopping is never punished. | **D8** | `478-547` | — |
| **RC-09** | One table decision reaches four (or eight) Skills' windows; one `ProgressAttempt` carries one `skillId` (`types.ts:79`), and §11 says nothing is owed. | **§11** | `951-956` | D2 `192-267` |
| **RC-11** | §15 criterion 3 is a *checkable* approval criterion asserting D4's table has **"6 of 6" rows**. The taxonomy now holds 11 types. A criterion that certifies a stale count is the guard-that-cannot-fail shape. | **§15 criterion 3** | `1148-1149` | D4 `351-394` |
| **RC-10** | A learner meets `hard` at a table first. D13 spends the one-exposure licence there, and D13 says that licence binds D4's curriculum-only blocked pool. | **D13** | `648-675` | D4 `351-394` |
| **RC-12** | §10's `A-23` row still gives *"the Coached-then-Closing shape"* as the reason no row is filed — the shape D3 withdrew. | **§10 `A-23` row** | `880` | — |

---

## Group 3 — recorded, no landing loop (13)

Filed so a later reader does not re-find them. No verdict, no edit owed.

**Defects in the two passes themselves (2).** Recorded because this repo's rule is that a pass records
its own failures.

1. **Instance B over-scoped an absence claim.** Its record (`…composition-audit.md:856-858`) says
   `ungraded` *"appears nowhere"* in the LDB-06 spec. It appears three times — `:833`, `:909`, `:995`
   — all quoting the schema's `{ status: 'ungraded' }` in the free-play-grading sense, not LDB-09's.
   The substantive point survives; the claim as written does not. **This is failure class 3 recurring
   inside the pass built to catch it** — the mirror image of what §16 records about the 2026-08-08
   examiner's F2, which grepped narrower than its claim read. Third occurrence of the class.
2. **One item fell between the two passes.** A handed the chart-at-a-Table-sitting question to B; they
   ran concurrently and B had already finished. It is promoted to Group 2 above rather than lost. **The
   structural lesson: a cross-pass handoff between parallel instances has no carrier.** Run the second
   instance after the first, or give the handoff an owner.

**Non-material, instance A (8).** `product-vision.md` cited without its directory (settled repo
convention, not drift); `product-vision.md:90` anchored two lines short of its sentence; two different
`D7`s in one paragraph, disambiguated by content; the twelve-removals enumeration rhetorical at two
points (leaderboards are *deferred*, not removed — `LDB-05:499`; "surfaced verdicts" is scoped to
`rule-contrast`); §16's F7 row describes a landing no longer in the document, discharged by §16.1;
divergence 5 cross-references §11 item 3 but not item 5, the item that actually covers it;
`{ status: 'graded' }` quoted without its full union variants; the header names two deadlock
participants where D3 and `journal/decisions.md:606-608` name three.

**Non-material, instance B (3).** D9's Coached row reads `arranged` permitted where the Solution reads
*"may use `arranged` Provenance mode"*; §16 and §16.1 narrate the 2026-08-08 pass in the present tense
in places; `journal/tasks.md` shows LDB-09 Done and LDB-06 still on the board, which is correct but
reads oddly against the header's future tense.

---

## What survived — stated because a survivor is a result

Verified first-hand by instance A, not assumed:

- The `docs/specs/product-vision.md:69-71` re-reading behind divergence 5 — verbatim, and read
  identically by approved `LDB-05` D9 (`:467-469`). Divergence 5's central argument holds.
- `deal-and-decide`'s `produced` contract and the four-of-eight `classificationIncluded` split
  (`activity-taxonomy.json:62,67`; `skill-graph.json:192-259`).
- §11 item 5's absence claim — the whole of `web/src/progress/types.ts` read, all 22 `ProgressAttempt`
  members enumerated positively.
- The §14 `journal/decisions.md` grep, scoped to what was searched.
- §15 criteria 4, 5 and 7 as amended.
- `ACT:388` bans *loss-framed* streaks and an up-only counter triggers none of it — the ruling of
  divergence 6 survives even though **RA-14** removes its citation.
- **§16.1's D3/D7/D8 deadlock is genuinely gone.** Instance B walked a Short arranged Coached session
  to a legal close (RC-14), and separately confirmed D7's bound does not reach a Table sitting (RC-13),
  reload produces no phantom `SessionRecord` (RC-15), and `'time-bound'` stays unreachable, owed and
  guarded (RC-17).

---

## §7 — the landing check (mandatory)

After applying Group 1 and any Group 2 edits, **confirm each correction is in its target file.** Not
"approved", not "recorded" — *present*.

Every pattern below was **tested against the unrepaired files on 2026-08-15** and the hit count it
returns today is recorded beside it. A pattern that already returns zero is a broken check, not a
finished repair — two of the six first drafted here did exactly that and are corrected below.

```sh
S=docs/superpowers/specs/2026-08-08-session-composition.md

# Group 1 anchors that must be GONE after the repair (today's hit count in brackets):
grep -n "owner's \(own \)\?words"        "$S" AGENTS.md   # [1 spec + 1 AGENTS] RA-15 / RA-15b
grep -n "gate open\(\*\*\)\? on 2026-08-08" "$S"          # [2] RA-01
grep -n "already licenses\|already anticipated exactly this shape" "$S"  # [3] RA-14
grep -n "All six are approved"           "$S"             # [1] RA-22
grep -n "LDB-09\` may change"            "$S"             # [1] RA-03 — phrase wraps a line break
grep -n "6 of 6"                         "$S"             # [1] RC-11

# Then the standing drift check, per AGENTS.md:
scripts/check-doc-drift.sh
```

Each grep must return **zero hits** for the anchor it retires, *having returned the bracketed count
before the repair*. A grep that returns nothing because the pattern is wrong is the absence-as-proof
failure, and it is not hypothetical here:

- `"owner's own words"` returned **0 in `AGENTS.md`** — because `AGENTS.md:20` reads *"in the owner's
  words"*, without "own". The check would have certified the propagated error as already fixed.
- `"may change the Activity type set"` returned **0** — the phrase wraps a line break at `:29-30`.

Both were found by running the checks before shipping them. Run any new anchor against the
unrepaired file first, and record the count it returns.

---

## §7 — EXECUTED 2026-08-17. All 23 items landed; two of the six greps above were themselves defective

All 10 Group 1 repairs and all 13 Group 2 rulings are in their target files, plus one ruling the
grill itself opened (the Player score). Verified **positively** — each correction grepped for as a
present string, not merely as a retired anchor — and recorded in `journal/decisions.md` under
2026-08-17.

**Two of the six anchors above are broken checks, and one of them can never pass.** They were run
against the repaired files and did not go to zero:

1. **`grep "already licenses\|already anticipated exactly this shape"` — over-broad, and destructive
   if obeyed.** Its baseline of 3 counted **two** RA-14 loci plus one unrelated sentence: D7's
   *"`ALR-025` … **already licenses** duration as 'versioned planning input'"*, which is correct,
   evidence-backed, and has nothing to do with the streak claim. **This check can only reach zero by
   damaging a sound sentence** — the mirror image of the absence-as-proof failure the §7 preamble
   was written to prevent. A check that cannot pass without breaking the document is worse than no
   check, because the obvious way to make it green is to edit the wrong line.
2. **`grep "6 of 6"` and `grep "Nothing in the pass looked at"` return hits by design.** This
   repository's convention is that a correction **quotes the text it retires** — `LDB-06` §16 and
   §12 divergence 2 both do it deliberately, so the reasoning stays readable. A deletion-shaped grep
   therefore reports a correctly-executed quote-and-strike repair as an unfinished one.

### The retirement-grep is the wrong instrument, and this section proves it twice

**Two replacement patterns were drafted here to fix the two above. Both failed the same way, in this
file, in the paragraph that had just described the failure.**

- `grep "D12 already"`, offered for RA-14, hits `LDB-06` §13's *"`LDB-05` D12 already assigned
  decision quality above profit and loss to you"* — a different decision, a sound sentence. **The
  identical over-broad defect as the pattern it was replacing.**
- `grep "table has \*\*6 of 6\*\* rows"`, offered for RC-11 as *"the assertion rather than the
  string"*, hits the RC-11 correction block's own quotation of the retired assertion. **The identical
  quote-and-strike defect as the pattern it was replacing.**

Recorded rather than quietly re-drafted, because this is `AGENTS.md`'s fourth named recurrence of
*rules do not fire on their author*: a section written to document a class of broken check produced
two more instances of that exact class before it finished.

**So the instrument changes, not the patterns.** A deletion-shaped grep is structurally wrong for
this repository, because the convention is that a correction quotes what it retires — the retired
string is *supposed* to survive. Verify **positively** instead: grep for the repaired claim as a
present string. This is also what `AGENTS.md` literally asks for — *"A correction pass ends by
checking that its corrections are **in the target file**"* — and the retirement greps were a
weaker proxy for it that nobody had noticed was a proxy.

```sh
S=docs/superpowers/specs/2026-08-08-session-composition.md
pos(){ [ "$(grep -c "$1" "$S")" -ge 1 ] && echo "PRESENT  $2" || echo "MISSING  $2"; }

pos "at most\*\* one Mastery window"                    "Q1  D7 bound"
pos "The bound counts \*\*every\*\* Presentation"        "Q1  ruling"
pos "The Recommender's band selects the shape"          "Q2  RC-01"
pos "The chart is available at a Table sitting"         "Q3  unowned"
pos "never appears in a Closing run"                    "Q4  RC-03"
pos "A Table sitting cannot be closed in the schema"    "Q5  RC-05"
pos "A-07e\`'s named test cannot close"                  "Q6  RC-07"
pos "Nothing states which key the Mastery window folds" "Q7  RC-09"
pos "produced element\* that diverged"                   "Q8  RC-08"
pos "The unit is a committed Presentation"              "Q9  RC-06"
pos "does \*\*not\*\* spend the first-exposure licence"  "Q10 RC-10"
pos "carries \*\*one row per"                            "Q11 criterion 3"
pos "hand-sort\` | \*\*Mixed"                             "Q11 D4 row"
pos "The bands order \*\*Skills\*\*"                     "Q12 RC-04"
pos "the mitigation lives in an approved spec"          "Q13 RC-12"
pos "does not move the Player score"                    "Q14 rating"
pos "Unmeasured Activity"                               "rename"
```

**All 17 returned `PRESENT` on 2026-08-17**, together with `check-doc-drift.sh` (no drift across 6
checks) and `check-ldb03-taxonomy.js` (8 passed, 0 failed).

**The general lesson, which is the reusable part.** The original greps were validated for *false
negatives* — the preamble above shows two being caught for returning 0 against unrepaired files — and
never for *false positives*. Both directions need a pre-flight. The false-positive direction is the
more dangerous one here, because a red check invites an edit, and under quote-and-strike red is the
**correct** state for a finished repair.

**Not repairable by editing `LDB-06`, and correctly not marked done:** `RC-05`'s `closeReason` and
`RC-07`'s missing preset remain schema deltas owed to phase 5. Both are now in §11's owed list —
items 6 and 7 — where a phase-5 builder will look, joined by items 8 (a reducer rule) and 9 (two
taxonomy edits plus the `check-ldb03-taxonomy.js` check-7 adaptation they will trip).

**Two items are not repairable by editing this document and must not be marked done here:**
`RC-05`'s `closeReason` and `RC-07`'s missing preset are **schema** deltas owed to phase 5. They belong
in §11's owed list, which is where a phase-5 builder will look.
