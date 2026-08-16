# C8 — Floyd, Whelan & Meyers (2006): the known-missing study, retrieved

> **Authority: evidence only.** This file designs nothing and outranks nothing. It is a collector's
> claim awaiting independent verification (Inbox-ingestion Rule 0).
>
> **Scope:** one paper, one record. Bounded gap top-up closing the KNOWN-MISSING item recorded at
> `docs/superpowers/research/foundation-audit-p3/README.md:44-48` and
> `docs/superpowers/specs/2026-07-22-product-design-inputs.md` §0 and §2.5.
>
> **Collected:** 2026-07-23. Collector did not verify its own work.

---

## 1. Full citation (as actually retrieved)

Floyd, K., Whelan, J. P., & Meyers, A. W. (2006). Use of warning messages to modify gambling beliefs
and behavior in a laboratory investigation. *Psychology of Addictive Behaviors*, *20*(1), 69–74.
https://doi.org/10.1037/0893-164X.20.1.69 · PMID 16536667

**The PMID and page range in the Phase 3 records are correct. The paper exists.** The dossier
collector's absence claim was wrong, as the verifier said.

**But the title is not what either Phase 3 record implies.** Both the README and the bridge spec
describe it as "a randomised controlled trial of instruction on irrational gambling beliefs." Its
actual subject is **warning messages displayed during simulated play**, in a **laboratory**
investigation using **imaginary money**. That distinction is load-bearing and is developed in §5.

---

## 2. Access level achieved — READ THIS BEFORE USING ANYTHING BELOW

**ACCESS LEVEL: ABSTRACT-ONLY. Full text was NOT obtained.**

Every extraction in §3 comes from the published abstract. Nothing below is sourced from the article
body, because the collector never saw the article body.

### Routes attempted

| Route | URL | Outcome |
|---|---|---|
| PubMed record | `https://pubmed.ncbi.nlm.nih.gov/16536667/` | **OPENED.** Full abstract, MeSH, pub types. |
| U. Memphis institutional repository | `https://digitalcommons.memphis.edu/facpubs/8904/` | **OPENED.** Same abstract, verbatim-identical. No PDF hosted; page links out to the DOI only. |
| Semantic Scholar API (by DOI) | `api.semanticscholar.org/graph/v1/paper/DOI:10.1037/...` | **OPENED.** Returns `"isOpenAccess": false`, `openAccessPdf.status: "CLOSED"`, `"abstract": null` (elided by publisher). |
| Unpaywall API (by DOI) | `api.unpaywall.org/v2/10.1037/0893-164X.20.1.69` | **OPENED.** `is_oa: false`, `oa_status: "closed"`, `oa_locations: []`. **No repository copy exists anywhere Unpaywall indexes.** |
| APA PsycNet record | `https://psycnet.apa.org/record/2006-03489-009` | **FAILED.** Page returned a JS "Loading…" shell with no record content. Could not confirm the record ID is even correct — treat that URL as unconfirmed. |
| scholar.archive.org | search on exact title | **NO FULL TEXT.** Microfilm-scan stub of a *Psychological Abstracts* entry only. |
| PMC | `pmc.ncbi.nlm.nih.gov/search/` | **ZERO RESULTS.** Not in PubMed Central, and no open-access PMC article surfaced that describes it. |
| Georgia Southern ETD (a secondary source that discusses it) | `digitalcommons.georgiasouthern.edu/cgi/viewcontent.cgi?article=2941&context=etd` | **HTTP 403 Forbidden.** Not opened. |
| BMC / Springer review (secondary) | `10.1186/s12889-018-6281-0` | **AUTH WALL.** Redirected to `idp.springer.com/authorize`. Not opened. |

**Conclusion on access:** the article is genuinely closed-access with no indexed open copy. Full text
requires institutional subscription to *Psychology of Addictive Behaviors* or an interlibrary route.
This is a real barrier, not a search failure. **The full text remains an outstanding retrieval task
if Phase 4 wants to lean on this paper's numbers.**

### Corroboration of the abstract text

The abstract was obtained from **two independent hosts** (PubMed; U. Memphis DigitalCommons) and the
text is **character-identical** between them. That raises confidence that the quoted abstract in §3
is the publisher's abstract and not a re-write. It does **not** raise confidence about anything the
abstract does not say.

---

## 3. Extraction — everything below is from the abstract, verbatim where quoted

### 3.1 The complete abstract, quoted in full and unabridged

> "This laboratory study assessed the effectiveness of warning messages intended to aid in the
> control of gambling. Participants were 120 undergraduate students from an urban state university
> who reported previous gambling activity. They were recruited to play a computerized roulette game
> with imaginary money. Money left at the end of play was exchanged for raffle tickets for a prize
> drawing. Participants were randomly assigned to 1 of 2 conditions. In the warning-message
> condition, participants received an educational component discussing common irrational beliefs
> expressed by gamblers and, while playing roulette, viewed brief messages that addressed irrational
> gambling beliefs. In the control condition, participants received an educational component on the
> history of roulette but no warning messages. Participants in the warning-message condition reported
> significantly fewer irrational beliefs and demonstrated less risky gambling behavior than those in
> the control condition."

*Locator: abstract, PubMed PMID 16536667 / DigitalCommons Memphis facpubs/8904. Reproduced complete —
first word to last word, no elision. This program has twice been bitten by silent truncation, so the
whole thing is here rather than the convenient part.*

### 3.2 Design

- **Randomised: YES.** Verbatim: *"Participants were randomly assigned to 1 of 2 conditions."*
- **Arms: TWO.** Warning-message vs control.
- **Control type: ACTIVE / attention-matched, NOT no-contact.** The control arm *also* received an
  educational component — verbatim: *"participants received an educational component on the history
  of roulette but no warning messages."* **There is no untrained / no-contact control arm** described
  in the abstract. The dispatch asked specifically about this: the answer is that the comparison is
  content-matched-for-time but content-different, and the abstract describes no third untreated arm.
- **Setting: laboratory, single session** (implied by "laboratory study" and by the abstract
  describing no follow-up; see §6 for what this does *not* establish).
- **Publication types listed by PubMed:** "Research Support, Non-U.S. Gov't". **PubMed does NOT tag
  this paper "Randomized Controlled Trial."** The randomisation claim in §3.2 rests on the abstract's
  own sentence, not on an indexing tag.

### 3.3 Sample

- **N = 120.** Verbatim: *"Participants were 120 undergraduate students from an urban state
  university who reported previous gambling activity."*
- **Population: undergraduate students**, not treatment-seeking or problem gamblers. Eligibility was
  *"reported previous gambling activity."*
- **Per-arm N: NOT STATED in the abstract.** (60/60 would be the natural guess. It is a guess. Do not
  record it as a finding.)
- **Recruitment method beyond "recruited to play": NOT STATED in the abstract.**
- PubMed MeSH includes Adult, Female, Male, Humans — no age or sex breakdown is given.

### 3.4 What the intervention actually was

Verbatim: *"In the warning-message condition, participants received an educational component
discussing common irrational beliefs expressed by gamblers and, while playing roulette, viewed brief
messages that addressed irrational gambling beliefs."*

**This is a bundled two-part treatment**, and that matters enormously for how this paper can be read:

1. a pre-play **educational component** about irrational gambling beliefs, plus
2. **in-play warning messages** shown *during* the roulette game.

**The design as described cannot separate the two.** There is no arm receiving education without
messages, or messages without education. Therefore **this paper does not isolate the effect of
instruction.** Any behavioural effect it reports could be driven wholly by the in-play prompts —
which are a *situational cue at the moment of decision*, a categorically different mechanism from
*taught knowledge carried forward*.

- **Duration of the educational component: NOT STATED in the abstract.**
- **Number, wording, or frequency of the warning messages: NOT STATED in the abstract.**

### 3.5 Outcomes — beliefs vs behaviour, kept strictly separate

**BELIEF outcome.** Verbatim: *"reported significantly fewer irrational beliefs."*
- Instrument: **NOT NAMED in the abstract.**
- Direction: favours warning-message condition. Statistical significance asserted; **no test
  statistic, p-value, or effect size is given in the abstract.**
- Note the word **"reported"** — this is a self-report belief measure.

**BEHAVIOUR outcome.** Verbatim: *"demonstrated less risky gambling behavior."*
- **What "risky gambling behavior" operationally means is NOT DEFINED in the abstract.** No bet-size
  variable, no persistence variable, no trial count, no wager total is named.
- The behaviour occurred **inside the experimental session**, on a **computerized roulette game**,
  with **imaginary money** — verbatim: *"a computerized roulette game with imaginary money."*
- The only real incentive was indirect and weak: *"Money left at the end of play was exchanged for
  raffle tickets for a prize drawing."*

### 3.6 Effect sizes and follow-up

- **Effect sizes: NONE reported in the abstract.**
- **Follow-up interval: NONE. The abstract describes no follow-up assessment of any kind.** The
  behavioural measure is, as far as the abstract shows, **immediate and in-session only**.
- Neither absence should be read as "the paper reports none" — abstracts routinely omit statistics.
  It means **the collector could not establish them.** See §6.

### 3.7 Authors' own stated limitations

**NOT OBTAINABLE.** Abstracts in this journal do not carry a limitations section, and the full text
was unreachable. **The collector has read no limitation statement by these authors and makes no
claim about what they did or did not concede.**

---

## 4. One traceability warning about search-engine text

During retrieval, a web-search tool's *generated summary* asserted additional specifics about this
paper — including that participants given messages "stop play earlier and place smaller bets," and
two purported verbatim message texts beginning "CAUTION:". **The collector could not trace any of
that to a source it actually opened.** It does not appear in the abstract reproduced in §3.1.

**Treat all of it as UNSOURCED. Do not quote it. Do not cite it.** It is recorded here only so that a
later reader who encounters the same snippet knows it was seen and deliberately rejected, and so it
cannot re-enter the record laundered as a finding. If it is true it will be in the paper's Results
section — which is exactly the thing that still needs opening.

---

## 5. Direct verdict on bridge-spec §1.7

**Question posed:** does this paper support, weaken, or leave untouched the claim that teaching
probability/randomness does not change gambling behaviour?

**VERDICT: it LEAVES §1.7 SUBSTANTIALLY UNTOUCHED. It is not the refutation the Phase 3 records
feared, and on the evidence obtainable it is not a refutation at all. It should, however, retire the
framing in §2.5.**

Reasoning, in order of weight:

1. **Different construct.** §1.7 rests on a study of *taught knowledge* — probability theory
   instruction, with the behavioural outcome measured after the teaching is over and the teacher is
   gone. Floyd et al.'s treatment includes **cues delivered during the gambling act itself.** A
   prompt on screen at the moment of the bet tests whether *reminding* works, not whether *teaching*
   works. These are different mechanisms and the paper's design cannot pull them apart (§3.4).

2. **The behavioural endpoint is weak in exactly the way the dispatch anticipated.** It is
   **in-session, simulated, imaginary-money, single-occasion** play — and the abstract never defines
   what was measured. §1.7's null is a null on **real gambling behaviour at six months**. An
   immediate effect on play-money roulette is not evidence against a six-month real-behaviour null;
   the two are not measuring the same thing on the same timescale with the same stakes. **An RCT with
   a soft behavioural endpoint does not overturn a longitudinal behavioural null**, and this endpoint
   is soft on three axes at once (stakes, setting, horizon).

3. **No follow-up at all** (§3.6). §1.7's whole force is about *durability and transfer*. This paper,
   as described, speaks to neither.

4. **The control is active, not untrained** (§3.2). The contrast is "irrational-beliefs education +
   in-play warnings" vs "roulette-history education." That is a well-behaved comparison for isolating
   *content*, but it means the paper cannot tell you the size of the effect against doing nothing.

5. **What it does genuinely add — and this is not nothing.** It is a randomised demonstration that a
   belief-targeting intervention moved **a behavioural measure and not merely a quiz score**, in the
   same session. §1.7's design imperative is "measure play, not quiz scores"; this paper *did* measure
   something play-shaped and found a difference. That is a modest positive signal for the *format*
   — cue-at-the-moment-of-decision — and a live design hypothesis for Phase 4. It is not evidence
   that instruction transfers.

**Net effect on the Phase 3 → Phase 4 bridge:**

- **§1.7 stands.** Its scoping conclusion — knowledge gain and behaviour change are separate outcomes;
  measure play — is not weakened by this paper.
- **§2.5 needs its framing corrected, not its status changed.** §2.5 currently warns that Floyd et al.
  "may well cut the other way." On abstract-level evidence, **it does not**; it is a different study
  than §2.5 describes (warning messages in a lab, not randomness instruction). §2.5's *status* —
  **OPEN** — is unaffected and remains correct.
- **The bridge spec's §0 characterisation ("a randomised controlled trial of instruction on
  irrational gambling beliefs, positive on beliefs *and* play") is misleading on two counts:** the
  treatment is not instruction alone, and "play" is imaginary-money in-session play. Recommending a
  correction is outside this collector's authority; recording the discrepancy is not.

**Confidence:** MODERATE, and explicitly bounded by §2. Every clause above is derived from an
abstract. If the full text reveals a follow-up assessment or a defined real-stakes behavioural
measure, this verdict would need revisiting. Nothing found suggests it will, but the collector cannot
exclude it.

---

## 6. What I could not establish

Stated plainly, because an honest gap is the point of this section.

1. **Any content of the article body.** Method, Results, Discussion, Limitations — all unread. Access
   is genuinely closed (§2); this is not a search failure.
2. **The operational definition of "less risky gambling behavior."** This is the single most important
   unknown in the whole record. The entire §5 verdict would tighten or loosen depending on it.
3. **Per-arm sample sizes**, attrition, or whether N=120 is randomised or analysed.
4. **The belief instrument's name** and its psychometrics.
5. **Any effect size, test statistic, p-value, or confidence interval.**
6. **Duration and content of the educational component**, and the number/wording/timing of the warning
   messages.
7. **Whether any follow-up occurred.** The abstract describes none; that is not the same as the paper
   reporting none.
8. **The authors' own limitations.** No claim is made about them.
9. **The correct APA PsycNet record ID.** The URL tried in §2 did not render; it should not be cited.
10. **Whether PubMed's absence of a "Randomized Controlled Trial" publication-type tag is meaningful.**
    The randomisation claim rests on the abstract's own sentence, which is adequate, but the indexing
    discrepancy is noted rather than explained.

**Outstanding retrieval task if Phase 4 wants to lean on this:** obtain the full text through an
institutional subscription or interlibrary loan and re-extract §3.5 and §3.6 from the Results table.

---

## 7. Source-lead register (leads only — NOT collected, NOT cited)

Recorded so they are not re-discovered from scratch; **none was opened, none may be cited.**

- A Georgia Southern University ETD ("Induced Moods, Warning Messages, and Gambling Behavior") appears
  to discuss this study in detail. Blocked 403 here. Would likely yield a secondary description of the
  behavioural measure — but a secondary description is not the source and would need labelling as such.
- A 2025 *Journal of Gambling Studies* systematic review of gambling interventions for college
  students (`10.1007/s10899-025-10421-y`) surfaced in search and is plausibly a route to this paper's
  extracted outcome data. **Adjacent literature — out of this brief's scope. Not chased.**
