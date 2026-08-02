---
title: Session Composition (LDB-06) — branch copy, not approved on main
status: raw-research-input
created: 2026-07-30
imported: 2026-08-02
source: PR #11, branch `claude/correct-work-rwm8me` @ `01c6974`
author_context: written on a branch, in a session that could not see `main`
authority: non-authoritative
---

> **NOT APPROVED ON `main`. Read this before the heading below.**
>
> The body of this document is reproduced **verbatim** from the branch, including its own status
> line, which reads *"Status: draft for approval"*. **That status is a fact about the branch and not about this repo.**
> On `main`, **LDB-06 is in `Ready` at `Evidence: pending`** — the card has not been decided.
>
> This approval happened in a session blind to `main`, which is the incident that closed PR #11:
> two cards were approved twice, two days apart, against two boards that had forked. See
> `journal/decisions.md`, 2026-08-02.
>
> **What this file is for:** evidence, read as *input* to the LDB-06 grill — an argued position worth
> answering, never a decision to inherit. Per `AGENTS.md`'s inbox-ingestion Rule 0, raw material
> is data and evidence only; it cannot outrank approved decisions, code behaviour, or an
> authoritative spec. **Nothing here may be cited as settled.**

---

# Session Composition — LDB-06

> **Status: draft for approval.** Gate: user-approval. ROADMAP Phase 4 deliverable 6.
>
> **Inputs.** `2026-07-22-product-design-inputs.md` §4 and §7; LDB-03's seven families and contract
> C-F; LDB-04's mastery model and 14-day horizon; `web/src/progress/types.ts` §4.2 (the session
> record); the LDB-02 archive's spacing evidence, read at `run/U3/audit.md`.
>
> **What this decides.** Session entry, size, stopping, and mix — plus the bridge contradiction the
> card requires be resolved in writing. It does **not** decide the economy (LDB-05), the interaction
> contract or WCAG target (LDB-07), or mastery thresholds (LDB-04, approved).

---

## 0. The session shape already exists in the schema

As with LDB-04, the durable record was built for this deliverable and nothing consumed it.
`progress/types.ts:123-136` defines `SessionRecord` with:

- `budget: { presetId: string; targetDurationMs: number; maxActivities: number }` — a session is
  bounded on **both** time and count, and the preset is a named identity rather than an inline pair.
- `closeReason: 'evidence-target-met' | 'time-bound' | 'activity-bound' | 'learner-stopped'` — **four
  values, and they are the complete set of ways a session can end.**
- `openedAt` / `closedAt`, `curriculumVersion`, `reducerVersion`, and a non-authoritative `summary`.

**This document therefore writes policy against an existing shape rather than inventing one.** Every
rule below attaches to one of those four close reasons or to the budget triple. Where it needs
something the schema lacks, it says so (§5.3).

---

## 1. The bridge contradiction, resolved

**The contradiction, verified at both loci.** `2026-07-22-product-design-inputs.md:230` states, as
activity-evidence requirement §4.6: *"**Rare-event exposure must be deliberate** (§1.2). Experience-only
learners underweight the tail; if the tail matters, the curriculum has to engineer encounters with it
rather than wait for the shoe."* And `:294`, under §7's open decision candidates, lists: *"Whether
rare-event exposure is engineered or organic (§4.6)."*

The §7 entry **cites the very requirement it reopens**, so this is not an oversight of one section by
the other.

**Ruling: §4.6 stands. Exposure is engineered. §7's entry is withdrawn as mis-scoped.**

Three grounds, in order of weight:

1. **§4.6 carries a warrant and §7 carries none.** §4.6 rests on §1.2, which is marked `[VERIFIED]`:
   adults who learn a probability by *sampling outcomes* behave as if they **underweight** rare events,
   robust across more than 70,000 choices. §7 offers no counter-evidence — it lists a choice. **An
   unwarranted "open" does not reopen a warranted requirement.**
2. **"Organic" is not the weaker option; it is the condition the evidence measured and found
   wanting.** Waiting for the shoe *is* learning by sampling at the shoe's own frequencies, which is
   precisely what §1.2 shows produces tail-underweighting. Choosing organic would be choosing the arm
   that failed.
3. **An approved outcome now depends on it.** LDB-04 and LDB-01 carry `P4` — *keep playing correctly
   through a losing run* — whose measurement requires an **engineered** losing run (`A-26`). Organic
   exposure would leave an approved outcome unmeasurable, since the tail arrives too rarely to
   instrument.

**What is genuinely open, and is not what §7 said.** Not *whether* to engineer, but **dosage and
placement** — how often an engineered tail event appears and where in a session. Those are constants,
and they go to the register (§7 below) rather than staying as a binary in a decision list.

---

## 2. Session entry

**The system recommends a session; the learner may take it or choose otherwise.** This inherits
LDB-04's recommend-don't-lock ruling rather than re-deciding it — a session that could not be declined
would be gating by another name.

Recommendation inputs, in priority order:

1. **`Review due` skills first** (LDB-04's `A-06a` horizon). This is the one place decay becomes
   visible to a learner: a skill whose most recent qualifying evidence is older than the horizon is
   surfaced ahead of new material. Without this, decay would compute and never surface — a derived
   value nobody sees.
2. Skills below mastery threshold with existing evidence, so partial progress is finished before new
   material opens.
3. Next unmastered skill in the LDB-01 graph's recommended order — **recommended, never locked**.

---

## 3. Session size

Three presets, written against `budget`'s existing triple:

| Preset | `targetDurationMs` | `maxActivities` |
|---|---|---|
| `short` | 3 min | 5 |
| `standard` | 8 min | 12 |
| `long` | 15 min | 20 |

**Every number here is invented.** They are pooled into a single register sub-row (§7), and the
pooling is deliberate: a duration and an activity cap that bound the same session are not
independently validatable — raising one changes what the other means.

**The live conflict is inherited, not resolved.** `A-08` records Duolingo at "a few minutes" against
Brilliant's recommended fifteen with a two-minute option, and the baseline grades the topic
*"Medium-low; durations are product recommendations, not comparative causal thresholds."* `A-11`'s
two-to-four-minute unit size has **no citation** at all. The three presets deliberately **span** that
conflict rather than picking a side, so the learner's own selection becomes the instrument `A-08`
already names.

---

## 4. Stopping

The schema's four `closeReason` values are the complete set. Policy per value:

| `closeReason` | Fires when | Rule |
|---|---|---|
| `evidence-target-met` | the session's declared evidence goal is reached | Close and say so. Reaching the goal early is a success, not a short session. |
| `time-bound` | `targetDurationMs` elapsed | Close at the **end of the current activity**, never mid-activity — a truncated attempt would be recorded as `abandoned` and pollute the evidence. |
| `activity-bound` | `maxActivities` reached | Same end-of-activity rule. |
| `learner-stopped` | the learner stops | **All evidence earned in the session commits. Nothing is forfeited.** |

**`learner-stopped` carries no penalty, and this is a binding constraint on LDB-05.** The card's own
outcome requires *no loss-framed pressure and no penalty for stopping*. Concretely: stopping mid-session
must not void banked attempts, must not reset a streak-like counter, and must not be framed as loss
("you'll lose your progress"). LDB-05 designs the economy **downstream of this rule**, not around it.

---

## 5. Mix — the pool policy

### 5.1 Mixed by default, and the learner does not get to choose

`CFL-007` is resolved and is not reopened here: **block to introduce, interleave to practise.** A
category may be introduced in isolation so the concept lands; once introduced, **all practice and
review draws from a mixed pool**, and mixed review is the steady state rather than a final stage.

Supporting evidence, now first-hand in the archive rather than inherited: spaced practice **M = .61**
against massed **M = .35**, **d = 0.99** (`run/U3/audit.md`).

**The learner may not select blocked practice over mixed.** This is a deliberate exception to this
design's otherwise consistent recommend-don't-lock posture, and it has a specific reason: **78% of
participants performed better spaced while 78% rated massing as good or better.** Learner preference
here is anti-correlated with learner benefit, so offering the choice would reliably route people to the
worse condition.

The exception is narrow and worth stating precisely, because the two cases differ in kind: *navigation*
is unlocked because the cost of a wrong recommendation is a learner in the wrong unit, recoverable in
one click. *Mix* is not offered because the cost is worse practice that feels better — undetectable from
the inside, and `A-17` says confidence will not flag it.

### 5.2 How a pool is composed, reading C-F's declarations

LDB-03's contract C-F already binds each activity to declare its pool as `mixed` or
`blocked-for-first-exposure`. This card writes only the policy that reads those declarations:

- A session's practice pool is **mixed** unless every item in it is `blocked-for-first-exposure` for a
  category the learner has not yet been introduced to.
- A category **graduates** out of first-exposure after one completed introduction activity for it.
  Graduation is one-way; a category never returns to blocked.
- A blocked pool may never contain a category the learner has already met. That would be massed
  practice wearing a first-exposure label.

### 5.3 One thing the schema cannot currently express

`SessionRecord` records `budget` and `closeReason` but **carries no field for the pool's composition** —
whether a given session ran mixed or blocked. Without it, `P-3` cannot be answered from recorded data,
because the arms are indistinguishable after the fact.

This is an **additive** field and it belongs to whichever card first writes a session record. Recorded
here rather than assumed, and flagged in §8 as handed forward.

---

## 6. Rare-event exposure — the dosage §1 left open

Engineered tail encounters are scheduled, not awaited. Two dosage constants, both invented, both
pooled into one register sub-row with the mix constants (§7):

- **Minimum engineered tail events per session** at or above `standard` size: **1**. Qualifying
  encounters are dealer naturals, a losing run under correct play, and a correct-play hand that loses
  to a dealer draw-out.
- **Losing-run floor that counts as a `P4` measurement**: **4 consecutive losing resolved hands
  under correct play**. A floor is needed because a two-hand loss is not a run and would leave `A-26`
  unfalsifiable; three is common enough to be indistinguishable from ordinary variance.

**Both numbers were absent from this document until 2026-07-30.** The section named two constants,
defended them, and registered them without ever stating a value — and §8's self-check passed anyway,
because it only checked that every number present had a register row, never that every registered
constant had a number. The values above are **proposals with no evidence behind them**, and they are
the weakest content in this document.

**They are also no longer stated here alone.** Per §9, they live in
`web/src/tuning/params.ts` as `pool.minEngineeredTailEventsPerSession` and `pool.p4LosingRunFloor`,
carrying status `invented-unset-in-spec`, which is what the tuning panel displays while they are
being changed.

**Constraint from LDB-04, so this does not drift into rigging:** engineered exposure selects *when the
learner meets a situation*, never what the shoe contains mid-hand. The mission line holds — build shoes,
shuffle once, deal from the ordered shoe. An engineered encounter is a **scheduled scenario with its own
seeded shoe**, not a manipulated live one.

---

## 7. Assumption Register changes

Two sub-rows, no new top-level rows, per the owner's instruction that overlapping assumptions share
instruments:

| Filed under | Covers | Validation |
|---|---|---|
| **`A-07b`** | The three session presets — durations **and** activity caps as one target. Shares `A-08`'s and `A-11`'s instrument rather than duplicating it. | **playtesting** — learner-selected preset with completion and return rates recorded, which is the instrument `A-08` already names |
| **`A-07c`** | Pool-composition constants: the first-exposure graduation rule, the minimum engineered-tail rate, and the `P4` losing-run floor | **playtesting — `P-3`'s instrument.** Classification accuracy plus beginner drop-off, with a retention arm; blocked practice typically wins in-session and loses on delay, so an in-session-only read would invert the finding |

**Leaned on without spending:** `A-15` (the mixed-practice ruling is explicitly a bet on untested domain
transfer), `A-06a` (the horizon this card surfaces), `A-17` (why mix is not learner-selectable), `A-26`
(what the losing-run floor makes falsifiable), `A-08`/`A-11` (session length, whose conflict §3 spans
rather than settles).

---

## 8. Approvability self-check

**1. The session-size numbers carry register rows — checked in both directions.** All six numbers in
§3 plus the three dosage/mix constants in §5.2 and §6 are covered by `A-07b` and `A-07c` — pooled,
with the non-independence reason stated rather than asserted. No number appears anywhere above
without one of those two rows behind it, **and no registered constant lacks a number.**

That second clause is new, and it is here because its absence hid a real defect for the whole first
draft. The check as originally written — "no number without a row" — can only fail when a number is
present. It passed silently over §6's two constants, which had rows and no values. This is the
project's standing failure shape: *a check that can only fail when a record exists passes on a
missing one.* Enumerated positively, the nine constants and their values are:

| Constant | Value | Row |
|---|---|---|
| `short` duration / activities | 3 min / 5 | `A-07b` |
| `standard` duration / activities | 8 min / 12 | `A-07b` |
| `long` duration / activities | 15 min / 20 | `A-07b` |
| First-exposure graduation count | 1 completed introduction | `A-07c` |
| Minimum engineered tail events per `standard`+ session | 1 | `A-07c` |
| `P4` losing-run floor | 4 consecutive losing hands | `A-07c` |

**The same defect exists in an approved document.** `2026-07-30-evidence-and-mastery-rules.md:142-143`
names F5's minimum series length and calibration bar as constants sharing `A-07`'s sub-row, and sets
neither. That is LDB-04, already approved. It is recorded here because this card found it; repairing
it belongs to LDB-04's owner, and the two values now have proposals in the params module
(`mastery.calibration.*`) so nothing downstream has to invent them a second time.

**2. The blocked-versus-mixed rule is stated per activity.** §5.2 states it at the activity level by
reading LDB-03's contract C-F declarations, and adds the two rules C-F does not cover: one-way
graduation, and the prohibition on a blocked pool containing an already-met category.

**3. The bridge contradiction is resolved in writing.** §1, with both loci quoted and verified, a ruling
in favour of §4.6, three stated grounds, and an explicit narrowing of what remains open — dosage and
placement, now register rows rather than a binary in a decision list.

**Handed forward:**

- **`SessionRecord` needs an additive pool-composition field** (§5.3), or `P-3` cannot be answered from
  recorded data. Belongs to whichever card first writes a session record.
- **LDB-05 is constrained by §4**, not merely informed by it: no penalty for stopping, no loss framing,
  no voided evidence.
- Provisional on **`P-3`**. `A-15` records the mixed-by-default ruling as a bet; this card makes the bet
  measurable rather than assumed, which is the most it can do before data exists.

---

## 9. Delivery constraints (owner decision, 2026-07-30)

Two constraints the owner set on how this design — and every remaining Phase 4 design — reaches
code. They are recorded here because this is the card that introduced the constants they govern, and
they **bind `LDB-05`, `LDB-07`, and `LDB-08`** rather than advising them.

### 9.1 No invented constant is spelled at its use site

Every number `A-07` calls *invented until measured* lives in **one versioned module**,
`web/src/tuning/params.ts`, and is read from there. The rule and its reasons:

- **One source, so retuning is a value change, not a code hunt.** A threshold spelled inline in a
  reducer and again in a component has already forked.
- **Versioned and stamped.** `TUNING_PARAMS_VERSION` plus the set of active overrides travels with
  every playtest note, and belongs on every durable session row. The schema was already built for
  this: `SessionRecord` carries `budget.presetId`, `reducerVersion`, and `curriculumVersion`
  (`progress/types.ts:129-134`) — three fields whose purpose is tagging which constants produced
  which data. Retuning therefore does not corrupt the record it is calibrated against; it partitions
  it.
- **Changeable at runtime, with provenance visible.** A dev-only tuning panel changes any constant
  mid-session and shows, next to each one, its register row and whether it is a product judgement, an
  owner ruling, or one of the four a spec named and never set. An unlabelled dial invites treating an
  invented constant as a measured one — the exact overclaim `A-07` exists to prevent.

**A consequence worth stating, because it is the reason the owner asked for this.** Once the numbers
are defaults in a versioned module and the register routes them to playtest, **the exact values stop
being approval-blocking.** `A-07b`'s presets and `A-07c`'s dosage are *starting positions to be felt
and moved*, not decisions this document has to get right in advance. That is what makes §3's
conflict-spanning honest rather than evasive: spanning `A-08` is only defensible if moving the
numbers afterwards is cheap, and this constraint is what makes it cheap.

**It also found four holes.** TypeScript cannot compile against "a minimum rate", so building the
module surfaced every registered constant with no value: §6's two, and LDB-04 §2.2's two. Prose can
ship an unset constant and pass its own self-check; a module cannot.

### 9.2 Every surface captures playtest notes, anchored and stamped

Free play's per-hand note — attach-on-Deal, riding out on the round's JSONL line — produced three
product findings in its first sixteen-round session (`journal/ops/run-notes.md`). It is the only
mechanism this project has that reliably converts using the product into recorded evidence, and
until now the trainer had none of it. Every activity surface must therefore support:

- **A note at the moment a decision resolves** — the attach-on-answer analogue of attach-on-Deal —
  **and a note-now affordance available on any screen**, including screens with no decision on them.
- **An anchor supplied by the surface**, not inferred by the note UI: unit and step for a lesson,
  round index for a hand, `activityId` for a future activity. A note reading *"this drags"* is close
  to useless without knowing what was on screen and which preset was live.
- **A kind** — change-request or observation — because a thing to fix and evidence about whether the
  design works are triaged differently.
- **The params stamp**, per note rather than per session, since an override may change mid-session.
- **Export to `journal/qa/notes/`** — tracked, and triaged into `journal/qa/ledger.md` like any QA
  finding. Deliberately *not* `data/history/`: that path is gitignored because gameplay logs are
  personal and `origin` is public, so a note exported there could never reach the repo where the
  design it concerns lives. Free play's per-hand note keeps riding the round line and stays with the
  gameplay data; these are design findings and are kept apart from it.

**This partially covers, and does not replace, §5.3.** A note's anchor records what the learner was
looking at; it does not record what the session's pool was composed of. `SessionRecord` still needs
its additive pool-composition field before `P-3` can be answered from recorded data. Notes are
owner-authored evidence about the design; attempts are learner-generated evidence about learning.
Neither substitutes for the other.
