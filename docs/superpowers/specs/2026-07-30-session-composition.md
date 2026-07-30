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

- **A minimum rate of engineered tail events per session** at or above `standard` size — dealer
  naturals, a losing run under correct play, a correct-play hand that loses to a dealer draw-out.
- **A floor on the losing-run length** that counts as a `P4` measurement, since a two-hand loss is not
  a run and would make `A-26` unfalsifiable.

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

**1. The session-size numbers carry register rows.** All six numbers in §3 plus the three dosage/mix
constants in §5.2 and §6 are covered by `A-07b` and `A-07c` — pooled, with the non-independence reason
stated rather than asserted. No number appears anywhere above without one of those two rows behind it.

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
