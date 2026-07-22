# Audit — Unit U2

> Unit under audit: `docs/specs/product-vision.md` (102 lines, zero citations).
> Examiner: audit-examiner (Opus 4.8), 2026-07-21. Run dir: `foundation-audit-p2`.
> **This record assigns verdicts only. It does not edit the audited document, does not author
> successor content, and does not state what the project should do next.**

Verdict legend: Preserve / Relabel / Revise / Replace / Remove

<!-- Preserve — the claim stands as written. Must cite the exact Phase 1 dossier / baseline
       location that supports it.
     Relabel  — the claim is fine; its epistemic label (bucket) is wrong. This is the DEFAULT
       remedy for an uncited-but-reasonable claim — never escalate straight to Remove for want
       of a citation.
     Revise   — the claim overstates what its basis supports. Name the specific overstatement
       and the honest wording.
     Replace  — the claim is wrong but the topic still needs a claim. Name the successor claim;
       do NOT author it (drafting is a later phase, P4).
     Remove   — the claim is contradicted or baseless and nothing should stand in its place.
       Reserved for contradicted/baseless only — a Remove on a merely-uncited claim is itself a
       defect the verifier must reject. -->

## Evidence read before any verdict was formed (G7)

| Source | What was read | Read first-hand? |
|---|---|---|
| `docs/superpowers/research/foundation-audit-p1/README.md` | archive orientation, lines 1–74 | yes |
| `docs/superpowers/research/foundation-audit-p1/dossiers/C4-chesscom-khan.md` | **in full, 489 lines** — Chess.com puzzle/game rating (F1–F3), Khan Academy mastery ladder (F4–F6), efficacy F7–F13, sufficiency statement, coverage gaps, standing obligation | yes |
| `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md` | source register (`DUO-001`–`DUO-006`, `BRI-*`, `SCI-*`, `STD-*`, `TECH-*`), Product-Pattern Comparison, Learning-Science Evidence, existing-directions cross-check, Coverage Gaps and Conflicting Evidence, Recommendations | yes (lines 1–120, 395–455) |
| `docs/specs/product-vision.md` | the unit under audit, in full | yes |
| `journal/raw/_inbox/foundation-audit-p2/_templates/audit-record-template.md` | record format + calibration anchors | yes |
| `https://www.w3.org/TR/WCAG22/` (= `STD-001`) | SC 1.4.1 Use of Color, reopened under G9 | yes (WebFetch) |
| `https://digitalcommons.usf.edu/psy_facpub/1767/` (= `SCI-003`) | Rohrer & Taylor abstract, reopened under G9 | yes (WebFetch) |

No source was sought that the unit or a Phase 1 dossier did not already name. No `WebSearch` was
used (none is available to this role).

---

## Verdicts

| Claim ID | Verdict | Claim | Citation |
|----|----|----|----|
| K-U2-001 | Relabel | `docs/specs/product-vision.md:6` — "Build a Duolingo-like training game for learning blackjack and card counting." | CIT-U2-01 (`…product-activity-research.md:28`) |
| K-U2-002 | Relabel | `docs/specs/product-vision.md:23` — "- short learning loops, like Duolingo;" | CIT-U2-02 (`…product-activity-research.md:425-428`) |
| K-U2-003 | Relabel | `docs/specs/product-vision.md:11-17` — "1. Play Basic Strategy almost without mistakes. / 2. Track the table and understand the shoe. / 3. Learn running count. / 4. Learn true count. / 5. Apply count-aware decisions. / 6. Handle multiple seats, faster pace, and real casino-like cognitive load. / 7. Later: bet sizing, table selection, advanced count systems, casino rule variations, and CSM/ASM table variants." | CIT-U2-03 (`…product-activity-research.md:419-424`) |
| K-U2-004 | Preserve | `docs/specs/product-vision.md:58` — "short drill -> decision -> feedback -> weakness detection -> targeted repetition -> mastery gate" | CIT-U2-04 (`…product-activity-research.md:80`, `:87-88`) |
| K-U2-005 | Preserve | `docs/specs/product-vision.md:82` — "Basic Strategy should be learned in small chunks but tested in realistic mixtures." | CIT-U2-05 (`SCI-003`, reopened; `…product-activity-research.md:76`, `:91-92`) |
| K-U2-006 | Relabel | `docs/specs/product-vision.md:83-87` — "The player / should gradually move from: / 1. playing with the table open; / 2. playing without the table but without time pressure; / 3. playing without the table at realistic table pace." | CIT-U2-06 (`…product-activity-research.md:89-90`, `:77`) |
| K-U2-007 | Relabel | `docs/specs/product-vision.md:74-75` — "Feedback judges the quality of a decision against the active ruleset-matched strategy, never the / hand result." | CIT-U2-07 (`…product-activity-research.md:95-97`) |
| K-U2-008 | Preserve | `docs/specs/product-vision.md:78-80` — "Motivation should reward practice, comprehension, and improving decision quality. It must not / celebrate money won, encourage loss chasing, imply guaranteed profit, or punish a learner for / ending a session." | CIT-U2-08 (`…product-activity-research.md:67`, `:82`) |
| K-U2-009 | Preserve | `docs/specs/product-vision.md:45-46` — "Success, failure, and instructional feedback must remain understandable without color alone. Use / text, shape, iconography, and other accessible cues as appropriate" | CIT-U2-09 (`STD-001` SC 1.4.1, reopened; `…product-activity-research.md:68`, `:83`) |
| K-U2-010 | Relabel | `docs/specs/product-vision.md:69-72` — "The game teaches execution first." … "The goal is not to make the player a blackjack theorist. Explanations should be short and / useful, serving correct play and long-term mastery." | CIT-U2-10 (`…product-activity-research.md:77`, `:96-97`) |
| K-U2-011 | Preserve | `docs/specs/product-vision.md:96,101-102` — "- cards are not generated randomly one by one;" … "This matters because blackjack and card counting are statistical. The game must not fake / the table." | CIT-U2-11 (`…product-activity-research.md:453`) |

`…product-activity-research.md` = `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md`.

---

## Basis and reasoning, per verdict

Every verdict below states its **Layer-1 provenance** and its **Layer-2 status bucket**, and — for
every non-Preserve — makes the *falsifiability-intent* call explicitly (would the decision change if
playtesting contradicted it? yes → Assumption; values commitment → Product judgement).

### K-U2-001 — Relabel → **Product judgement**. Layer 1: `INFERENCE`.
This is the unit's central question, so it gets the fullest reasoning.

The premise is stated at `product-vision.md:6` with no citation, no hedge, and no bucket, and it
propagates verbatim into the project mission (`AGENTS.md`, "Duolingo-like blackjack training game").
The evidence actually held about Duolingo is the `DUO-*` register, and the approved baseline itself
grades it: `DUO-001` is typed "Official product and learning-method article" with the limitation
recorded verbatim at `…product-activity-research.md:28` as **"Product self-description; linked
research is not reported with enough detail here to establish causal effects."** `DUO-002`
(`:29`) — "no selection algorithm or outcome study." `DUO-003` (`:30`) — "Selected internal examples
with incomplete protocols." `DUO-005` (`:32`) — "Internal-service self-report." The single
peer-reviewed Duolingo source, `DUO-006` (`:33`), is limited to "Language-item recall and engagement
do not establish blackjack mastery thresholds or a general learner model."

So: **no efficacy evidence held by this program supports "Duolingo-like ⇒ people learn better."**
Every `DUO-*` source is vendor-authored, exactly as the dispatch warned; none is an independent
efficacy finding, and none is about blackjack.

> **Correction (C-U2-001, editorial):** This paragraph originally read "Every
> `DUO-*` source is `PUBLISHED` at vendor-self-description grade." That is false of `DUO-006`,
> which the register types verbatim as **"Peer-reviewed operational study"** (Settles & Meeder /
> ACL, 2016; `…product-activity-research.md:33`) — not a self-description, and the preceding
> sentence in this same paragraph already says so ("The single peer-reviewed Duolingo source,
> `DUO-006`..."). The defensible claim is *independence*, not source tier: `DUO-006` is
> peer-reviewed but vendor-**authored** (Duolingo Research), so it is still not an *independent*
> efficacy finding, and the surviving conclusion above ("no efficacy evidence... supports
> 'Duolingo-like ⇒ people learn better'") is unchanged. **The K-U2-001 verdict does not rest on the
> corrected sentence.**

<!-- LANDED C-U2-001 (V-U2, editorial): corrected false "Every DUO-* source is PUBLISHED at vendor-self-description grade" — DUO-006 is register-typed "Peer-reviewed operational study" (…product-activity-research.md:33), not a self-description; independence claim survives, K-U2-001 verdict unaffected -->

That is *not* a finding against the claim. The correct reading is that `product-vision.md:6` is not
an empirical claim at all — it is a **genre and values commitment**: this product should feel like a
light, approachable consumer learning game rather than a simulator or a gambling app. `:26-27`
("not an academic simulator with boring UI" / "not a gambling product centered on chips") confirms
that reading: the sentence is doing *positioning* work, not causal work. No playtest result would
overturn "we want this to be that kind of product"; a playtest could only change *which mechanics*
express it. Falsifiability intent therefore says **Product judgement**, not Assumption.

**The defect is the missing label, not the premise.** As written, a downstream reader inherits an
unmarked premise and can reasonably read it as settled. Relabel — to Product judgement — is the whole
remedy. This is explicitly **not** an `Unsupported` finding and explicitly **not** a `Remove`: the
claim is neither contradicted nor baseless, and absence of efficacy literature is not grounds to
delete a defensible product commitment.

Cross-check against C4, which is the nearest analogue evidence held: C4's sufficiency statement
(`C4-chesscom-khan.md:70-71`) rules that even for the far more heavily studied Khan Academy the
model-choice question "remains a Product judgement / Assumption call, not an Evidence-backed one."
A vendor-blog-grade premise cannot stand higher than that.

### K-U2-002 — Relabel → **Assumption**. Layer 1: `PUBLISHED` (vendor self-description) / `INFERENCE`.
"short learning loops, like Duolingo" is a *mechanism* claim, not a positioning claim — it sets
session length, and a designer builds session construction differently depending on the answer
(family 2). Unlike K-U2-001 it **is** falsifiable, and the held evidence already shows the question
is open: the baseline logs it as an unresolved conflict at `…product-activity-research.md:425-428`
— **"CONFLICT — Recommended session size. Evidence: Duolingo describes a few minutes (`DUO-001`),
while Brilliant recommends 15 minutes and offers 2-minute practice (`BRI-002`)"**, resolved only as
"learner-selected duration plus activity-count bounds, with values treated as configuration." The
comparison row at `:58` grades the whole topic "Medium-low; durations are product recommendations,
not comparative causal thresholds," and marks stopping/resume behaviour a `COVERAGE GAP`.

So the honest bucket is **Assumption** — it would change if playtesting contradicted it — not
Product judgement and certainly not Evidence-backed. **Not `Revise`**: the vision sentence sits
inside a "should eventually feel like" list (`:20`) and does not assert a duration, so there is no
specific overstatement to weaken. The label is what is wrong.

*Conflict logged, not resolved* (see Conflicts section).

### K-U2-003 — Relabel → **Product judgement**, with a `COVERAGE GAP` on external validation. Layer 1: `COVERAGE GAP`.
The seven-step ladder is the unit's curriculum-and-prerequisite claim (family 5) and is the single
most structurally load-bearing list in the document. No evidence held by this program bears on it:
the baseline records **"COVERAGE GAP — Blackjack transfer and numeric calibration … the studies
cover language, mathematics, general digital learning, classrooms, or psychometric simulation rather
than blackjack activity and retention data"** (`…product-activity-research.md:419-422`), and C4
covers chess and school mathematics, not blackjack.

Parts of the ordering are domain-necessary rather than chosen (true count is computed *from* running
count, so step 4 cannot precede step 3), but the sequence as a whole — where multi-seat load sits,
what is deferred to "Later" — is a curriculum design decision. Falsifiability intent: a playtest
could plausibly reorder steps 5–7, but the commitment to a prerequisite ladder at all is a values
choice about what "trained" means here. **Product judgement**, with the coverage gap carried
alongside it rather than smoothed over. No collection is requested here; recording the gap is the
result (`"we looked hard and it isn't there" is a result`).

### K-U2-004 — **Preserve**. Layer 1: `PUBLISHED`. Bucket: **Evidence-backed at mechanism level**.
Each named stage of the loop has a supporting location in the approved baseline: targeted repetition
— `…product-activity-research.md:87-88`, **"Targeted repetition: supported in principle by
retrieval and spacing evidence (`SCI-001`, `SCI-002`), but not by trapping learners in same-session
answer repetition"**; mastery gating — `:80`, **"mastery-learning programs showed positive average
achievement and attitude effects, especially for weaker learners, alongside extra time and lower
completion in some self-paced college programs"** (`SCI-006`, meta-analysis of 108 controlled
evaluations), whose project inference is **"gate only essential prerequisites … and keep evidence
counts and thresholds provisional until blackjack use data exists"**; feedback — `:79` (`SCI-005`).

The claim survives because of what it does **not** say: it names a stage sequence, not a mastery
*model*, no thresholds, and no measurement instrument. Had it named one, C4 would bite —
`C4-chesscom-khan.md:70-71` holds the Elo-vs-IRT/knowledge-tracing choice unsettled, and
`C4-chesscom-khan.md:463-471` adds the live caution that Khan Academy's own progress metrics
correlate with achievement while the least ability-contaminated metric (minutes spent) does not, so
"a mastery ladder can look validated by exactly the correlation that a pure prior-ability confound
would also produce." That caution constrains the *future* model choice; it does not contradict this
line. **Preserve, examined and deliberately left alone.**

### K-U2-005 — **Preserve**. Layer 1: `PUBLISHED`. Bucket: **Evidence-backed**.
The strongest evidence match in the unit, and it matches on *both* halves. Interleaving:
`SCI-003` reopened first-hand under G9 — Rohrer & Taylor abstract, verbatim: **"When tested 1 week
later, performance was vastly superior after mixed practice. Thus, the results of both experiments
favored the shuffled format over the standard format."** Chunk-first: the baseline's own
cross-check at `…product-activity-research.md:91-92` — **"Interleaving: supported for discrimination
after foundational practice (`SCI-003`); the evidence does not justify mixing every activity from
first exposure."** The vision sentence says exactly that: small chunks first, realistic mixtures at
test. Limitation carried, not smoothed: `:76` records the domain limit ("a narrow mathematics domain
and limited activity types"), and `:419-424` records that blackjack transfer is itself a coverage
gap — so this is Evidence-backed **for the mechanism**, not for any blackjack-specific parameter.
The claim states no parameter, so it does not overstate. **Preserve.**

### K-U2-006 — Relabel → **Assumption** (the specific three-stage ladder). Layer 1: `INFERENCE`.

> **Correction (C-U2-002, editorial):** This row originally read "Relabel → **Product judgement**"
> and its closing sentence (below) read "I call it **Product judgement** for the ladder-as-design."
> That contradicted this record's own declared falsifiability test (`:63-64`: "would the decision
> change if playtesting contradicted it? yes → Assumption") applied one sentence earlier in the same
> paragraph, which found "the rungs are closer to an Assumption." The audited claim
> (`product-vision.md:83-87`) is the specific three-rung sequence, not the general fading principle
> (which is separately Evidence-backed at `…product-activity-research.md:77`, `:59`), and the
> baseline's ruling on the closest analogue is unambiguous Assumption territory: **"the existing
> four-level ladder remains a project design rather than a research-derived sequence"**
> (`…product-activity-research.md:89-90`). Corrected bucket: **Assumption**. The `Relabel` verdict
> itself is unchanged.

The *principle* underneath — fade assistance before counting evidence as independent — is
Evidence-backed (`…product-activity-research.md:77`, worked examples and fading, `SCI-004`/`SCI-009`;
`:59`, "fade assistance before evidence is counted as independent mastery proof"). But the claim
under audit is not the principle; it is a **specific three-rung sequence** (table open → no table, no
clock → no table, at pace). The baseline rules on the closest analogue in the project's own design at
`:89-90`: **"Hint ladder: worked examples and fading support graded assistance (`SCI-004`,
`SCI-009`), but the existing four-level ladder remains a project design rather than a
research-derived sequence."** The same reasoning applies here with the same force.

Falsifiability intent: the *number and content of the rungs* would change under playtest evidence, so
the rungs are an **Assumption**. The commitment to fading *at all* is a Product judgement resting on
evidence, but the audited sentence (`:83-87`) is the rung sequence itself, not the underlying
commitment to fade, so the rung sequence's bucket governs this row: **Assumption**. Not `Revise` —
the sentence is hedged ("should gradually move from"), so nothing is overstated; only the bucket was
wrong.

<!-- LANDED C-U2-002 (V-U2, editorial): corrected K-U2-006 bucket from Product judgement to Assumption — the record's own falsifiability test, applied to the audited rung sequence rather than the underlying fading principle, and the baseline's "project design, not a research-derived sequence" ruling at …product-activity-research.md:89-90, both point to Assumption; Relabel verdict unchanged -->

### K-U2-007 — Relabel → **Product judgement**. Layer 1: `COVERAGE GAP`.
The baseline addresses this exact claim by name, and rules against calling it evidence
(`…product-activity-research.md:95-97`, verbatim): **"Decision/outcome separation: no reviewed
learning-product or study source directly tests gambling outcome bias. Keeping decision quality
independent from hand outcome remains an approved blackjack training constraint, not a newly
inferred research finding."** The comparison row at `:67` says the same in-line: "decision/outcome
separation is a blackjack project constraint, not a competitor-derived finding."

The claim is correct and I am not disturbing it — decision quality and hand result *are* separate
facts, by the mathematics of the game — but its warrant is domain reasoning plus a product-integrity
commitment, not learning-science evidence. Falsifiability intent: no playtest result would make this
project start grading decisions by hand outcome; that would be a different product. **Product
judgement.** Note that the vision doc arguably already labels it honestly by supplying its own
reasoning in-line (`:75-76`, "A correct decision can lose and a poor decision can win"); the Relabel
is to make the bucket explicit, not to weaken the claim.

### K-U2-008 — **Preserve**. Layer 1: `PUBLISHED`. Bucket: **Product judgement converging with evidence**.
The transferable requirement in the baseline is near-verbatim the vision sentence
(`…product-activity-research.md:67`): **"reward practice, comprehension, and decision quality; never
celebrate money won, penalize stopping, or use hand outcome as evidence of skill."** Its evidence
row (`:82`, `SCI-007`, meta-analysis across 344 samples): **"intrinsic and personally valued
motivation correlate with success, persistence, and well-being, while externally controlled
motivation is not associated with performance/persistence and relates to lower well-being,"** with
the project inference "make stopping/resuming neutral; avoid loss-framed streak pressure, outcome
celebration, or coercive continuation."

Strength is honestly bounded and I am not upgrading it: `:82` states the limitation verbatim
("primarily correlational and not a test of app stopping mechanics"), and `:439-443` logs
**"CONFLICT — Motivation and stopping"** (both Duolingo and Brilliant publish streak/competition
mechanics that cut the other way). The vision sentence does not claim causal proof, so it does not
overstate what `SCI-007` supports. The anti-gambling half is a values commitment that needs no
evidence and would survive any playtest. **Preserve** — the claim as written is exactly as strong as
its basis.

### K-U2-009 — **Preserve**. Layer 1: `PUBLISHED` (normative standard). Bucket: **Evidence-backed**.
Reopened `STD-001` first-hand under G9. WCAG 2.2, SC 1.4.1 Use of Color, Level A, verbatim: **"Color
is not used as the only visual means of conveying information, indicating an action, prompting a
response, or distinguishing a visual element."** That is the vision claim, normatively. The baseline
carries it at `…product-activity-research.md:68` (grade: **"High for the standards baseline"**) and
`:83`. The reduced-motion half of the same paragraph is likewise named at `:83`.

Note the honest limit, recorded not resolved: `:397-402` logs **"COVERAGE GAP — Product
accessibility behavior"** — no competitor conformance audit was found. That gap is about *competitor
practice*, not about the standard, so it does not weaken this Preserve. `:68` also notes
"product-specific usability still requires representative testing," which the vision sentence does
not deny. **Preserve** — the only claim in the unit resting on a normative standard rather than a
product self-description, and the strongest-provenance claim in the document.

### K-U2-010 — Relabel → **Product judgement**. Layer 1: `INFERENCE`.
"teaches execution first" / "not … a blackjack theorist" / "Explanations should be short" is
load-bearing for activity and feedback design (families 3, 4): it decides that activities are
decision drills rather than exposition screens. The evidence held runs adjacent but does not settle
it — `…product-activity-research.md:77` (worked examples reduce novice load, "benefits diminish with
expertise") supports *some* explanatory scaffolding early, which is a nuance the flat
"execution first" framing does not carry. I am **not** calling that a contradiction: the vision
sentence is about emphasis and about what the product is for, not about whether explanation exists
(`:71-72` explicitly keeps explanations, just "short and useful"). Falsifiability intent: this is a
statement about what kind of competence the product certifies — a values commitment. **Product
judgement.** Flagged for the record: the *degree* of explanation is the falsifiable part and sits
against `SCI-004`/`SCI-009`, but that is a design question this record does not enter.

### K-U2-011 — **Preserve**. Layer 1: `INFERENCE` (domain mathematics) + approved project constraint. Bucket: **Product judgement**.
Shoe integrity determines whether a counting drill produces valid evidence at all (family 3): card
counting exists only because draws from a shoe are conditionally dependent, which per-draw random
generation destroys. The approved baseline carries the matching adopted requirement at
`…product-activity-research.md:453`: **"adopt `ALR-001`–`ALR-024`, including deterministic truth,
traceable first-response evidence, ordered-shoe engine hands, and canonical fallback."** The vision
doc also states its own warrant in-line at `:101-102` ("This matters because blackjack and card
counting are statistical"), which is the honest labelling this unit otherwise lacks. **Preserve** —
correctly reasoned, correctly warranted in place, and consistent with an approved requirement. The
same principle restated at `:64` ("Free Play should not manipulate cards for lesson purposes. Cards
come from the actual shoe.") is the identical load-bearing claim at a different surface; auditing it
twice would be row inflation, so it is covered by this row rather than given its own.

---

## Coverage — what was examined and deliberately left alone

Read line by line. Assessed: 11 claims. Deliberately **not** given rows, with reasons, so the
verifier can check for a missed load-bearing claim rather than take a silence:

- `:3` "Status: directional. This is the durable product north star, not an implementation task
  list." — a scope disclaimer, not a claim in any of the eight families. It is, however, the closest
  thing the document has to an epistemic label, and it is worth the verifier's attention that
  "directional" marks *stability* ("durable", "not a task list"), not *warrant* — it does not
  distinguish evidence from judgement from assumption. Recorded here rather than rowed because it is
  a property of the whole document, not a claim a designer builds from.
- `:35-38` platform/web-first and mobile deferral — a delivery-sequencing decision, outside the
  eight families. Non-material for this audit.
- `:40-43` one coherent app-shell — product-surface coherence; outside the eight families.
- `:20-31` the Product Feel list other than `:23` ("fun, light, approachable"; "precise and serious
  under the hood"; "not an academic simulator with boring UI"; "must not drift into a dry debugging
  tool") — tone and positioning. No designer builds a *learning* decision differently from these; they
  are the vision doc doing its legitimate job. Routed to Non-material notes.
- `:62-66` Free Play as a mode, and the learning layer helping "around the game" — the card-integrity
  half is rowed at K-U2-011; the remainder (optional table access, hints, count tools, post-session
  feedback) is a feature inventory rather than a claim, and hint/assistance policy is U4's target,
  not this document's.
- `:90-99` the remaining eight simulation-integrity bullets (deck IDs, traceable origins, shuffle
  once, cut card/penetration, replayable logs) — one shared principle, rowed once at K-U2-011.

**Nothing in this unit is contradicted by the evidence held.** Zero `Remove` and zero `Replace` were
assigned, and that is the finding, not an omission: `Remove` requires a contradiction, and after a
full read of C4 and the approved baseline I found none. The unit's real defect is uniform and
singular — **an absence of epistemic labelling**, which the taxonomy answers with `Relabel`.

## Citation state rows

| Citation ID | Verdict it supports | Unit | State |
|---|---|---|---|
| CIT-U2-01 (`DUO-001`, via `…product-activity-research.md:28`) | K-U2-001 | U2 | VERIFIED |
| CIT-U2-02 (`…product-activity-research.md:425-428`, `:58`) | K-U2-002 | U2 | VERIFIED |
| CIT-U2-03 (`…product-activity-research.md:419-424`) | K-U2-003 | U2 | VERIFIED |
| CIT-U2-04 (`…product-activity-research.md:80`, `:87-88`; `SCI-006`, `SCI-001`, `SCI-002`) | K-U2-004 | U2 | VERIFIED |
| CIT-U2-05 (`SCI-003` reopened at `digitalcommons.usf.edu/psy_facpub/1767/`; `…product-activity-research.md:76`, `:91-92`) | K-U2-005 | U2 | VERIFIED |
| CIT-U2-06 (`…product-activity-research.md:89-90`, `:77`, `:59`) | K-U2-006 | U2 | VERIFIED |
| CIT-U2-07 (`…product-activity-research.md:95-97`, `:67`) | K-U2-007 | U2 | VERIFIED |
| CIT-U2-08 (`…product-activity-research.md:67`, `:82`; `SCI-007`) | K-U2-008 | U2 | VERIFIED |
| CIT-U2-09 (`STD-001` reopened at `w3.org/TR/WCAG22/`, SC 1.4.1; `…product-activity-research.md:68`, `:83`) | K-U2-009 | U2 | VERIFIED |
| CIT-U2-10 (`…product-activity-research.md:77`, `:96-97`) | K-U2-010 | U2 | VERIFIED |
| CIT-U2-11 (`…product-activity-research.md:453`) | K-U2-011 | U2 | VERIFIED |

Every `Preserve` (K-U2-004, -005, -008, -009, -011) rests on a VERIFIED citation, as required. The
two external sources my `Preserve` verdicts depend on most directly (`STD-001`, `SCI-003`) were
reopened first-hand rather than trusted through the baseline's rendering of them — per the
inherited-error lesson recorded at `C4-chesscom-khan.md:261` ("A pass that reads only verification
records inherits their errors silently"). The remaining `SCI-*` sources were not reopened; the
verdicts resting on them are `Relabel`s or rest on the baseline's own approved finding rows, and no
verdict here asserts anything about an unopened source's wording.

## Conflicts logged (recorded, not resolved)

- **CONF-U2-A — session length.** `product-vision.md:23` ("short learning loops, like Duolingo")
  sits against an already-logged baseline conflict, `…product-activity-research.md:425-428`:
  Duolingo "a few minutes" (`DUO-001`) vs Brilliant "15 minutes" plus a 2-minute option
  (`BRI-002`). The baseline's resolution is "learner-selected duration … values treated as
  configuration." The vision doc names one pole of a live conflict as the product's feel. Recorded;
  not resolved here, and no resolution is proposed.
- **CONF-U2-B — mastery-progression external validation (carried from C4, not originated here).**
  `C4-chesscom-khan.md:433-439`: "Confidence in Khan-Academy-style mastery progression as an
  *externally validated* design moves **down** … Every positive independent finding in this dossier
  compares Khan Academy usage against **less of it or none of it**, not against an equal-time
  alternative." This bears on the "mastery gate" stage at `product-vision.md:58` (K-U2-004) as a
  standing caution on the *model to be chosen*. It does not contradict the audited line, which names
  no model. Recorded so a later phase cannot claim it was unseen.

## Calibration — what "good" looks like

Held to the positive-control decisions `journal/decisions.md` R20, R24, R25, R26, R27: every verdict
above points at a doc path plus a line range, or a verbatim quotation from a reopened primary source
(`STD-001` SC 1.4.1; `SCI-003` abstract). No verdict rests on impression.

Two self-corrections made in-record rather than quietly, in the R24/R26 pattern:

1. My first pass drafted a `Revise` on K-U2-002 (session length), on the reasoning that "like
   Duolingo" overstates a vendor blog. **That was wrong** and I withdrew it: `:20` frames the whole
   list as "should eventually feel like", so no specific duration is asserted and there is nothing
   factually overstated to weaken. The defect is a missing label, which is `Relabel`. Escalating it
   would have been a manufactured defect of exactly the kind this program guards against.
2. My first pass drafted separate rows for `product-vision.md:64` and each simulation-integrity
   bullet at `:90-99`. **That was row inflation** — they are one load-bearing principle stated at two
   surfaces — and they are consolidated into K-U2-011, with the consolidation stated rather than
   silently applied.

Anti-pessimism check, answered explicitly: **5 of 11 verdicts are `Preserve`.** Zero `Remove`, zero
`Replace`, so no `DEFECT-REAL` answers are owed by the verifier for this unit. The unit's uncited
premise was resolved with `Relabel`, never `Remove`, and no claim was classified `Unsupported`.

## Non-material notes

*(un-numbered; no verdict; no landing loop)*

- `:20-31` Product Feel adjectives other than `:23` — "fun, light, approachable", "precise and
  serious under the hood", "realistic enough that the user feels like they are training for a real
  table", "not an academic simulator with boring UI", "not a gambling product centered on chips,
  bankroll, or casino fantasy". Tone and positioning; no design branches on them.
- `:29-31` "Early milestones are more technical because they build the foundations, but the project
  must not drift into a dry debugging tool." Programme-morale framing, not a design claim.
- `:33-43` Platform and Experience Direction (web-first; mobile via the admission process; one
  coherent app-shell). Delivery sequencing and surface coherence; outside the eight families.
- `:47-48` "Detailed visual rules belong to the visual-system design and research cycle, not this
  north-star document." A scope pointer.
- The document carries **zero citations end to end**, which is consistent with its stated
  "directional" status and is not itself listed as a defect here — the defect this record names is
  the absence of *bucket labels* on load-bearing claims, which is a different thing from the absence
  of footnotes and is addressed by the eleven rows above.
- Cosmetic: `:6` and `:23` both invoke "Duolingo" but at different strengths (whole-product genre vs
  one mechanic). Worth a drafter's attention; not a verdict.
