# Verification Record: W6 — C6-EC (the C6 editorial landing pass)

> Verifier: Claude (Opus 4.8, 1M) — fresh independent instance; NOT the C6 collector, NOT C6-FP,
> NOT V6, NOT V6b, NOT the C6-EC corrector | Date: 2026-07-20
> Scope: verify ONE pass — `C6-EC`, the editorial landing of V6 (F1–F6) and V6b (F7–F9) corrections
> into `C6-blackjack-teachable/dossier.md`. No collection. No scope expansion.
> Constraint compliance: **no `git` run**, dossier **not edited**, nothing written outside
> `verification/`, no build/test/install command run. Checks were read + literal string counts only.

## Verdict

**PASS.** Every claimed correction landed, every landed correction matches its underlying verifier
ruling, no unrelated text or conclusion was changed, and the resulting bucket/tier/caveat/sufficiency
statements are honest. Both restraint decisions are correct. The V6b loose end is genuinely resolved
without git, on evidence I could independently re-derive. **C6's SUFFICIENT verdict survives.**

Four residuals are recorded at the end. All are minor, none is use-affecting, and none of them is a
defect this pass was chartered to fix.

---

## Q2 first — did it actually land? (the pass's entire purpose)

This was the question to answer before any other, because C6 was the last card whose corrections had
never been applied. Literal string counts against the current dossier:

| Check | Pre-pass (as C6-EC reported on arrival) | Now | Landed? |
|---|---|---|---|
| `[C6-EC, 2026-07-20]` markers | 0 | **28** | — |
| `44%` / `16%` as **live** claims | 3 / 3 | **0 live** (6 / 6 total, every one struck-through, inside the DROPPED note, or inside the quoted Q6 blog being discredited) | YES |
| `Assumption` | 1 | **5** (incl. F2's re-bucket at L125–126) | YES |
| `one-tailed` | 0 | **5** | YES |
| `in an actual casino` live | 1 | **0** — struck at L552, barred from propagating at L562 | YES |
| `explicitly designed to approximate realistic table pace` | live | **struck** (L396) | YES |
| `zero baseline accuracy` | live | **struck** (L394) | YES |
| `§2.1.1` as F1's locator | live | **struck → §1 Introduction** (L85) | YES |
| Candidate conflicts carrying the dropped figures as live | yes | **struck; marked DISSOLVED** (L344–357) | YES |

The 28 markers are exhaustively enumerable and **every one traces to a correction explicitly recorded
in V6 or V6b** (or is the header banner). There is no marker I could not account for, and there is no
edit outside a marker that I could detect.

## Axis 1 — does every claimed correction match the source or the prior ruling?

| Correction | Dossier location | Matches V6/V6b? |
|---|---|---|
| **F2 — statistics DROPPED, Evidence-backed → Assumption** | L115–176 | **YES.** V6's Kills entry: "the 44%/16% figures are dropped… F2's directional claim re-buckets from Evidence-backed to Assumption." Landed exactly, including the permitted citation form ("may **not** be cited for any number", L168–170). The "three independently-worded secondary summaries" access claim is struck (L135–139) and replaced with V6's actual finding — **one Q6 blog (Griffiths, *Psychology Today*, "Basic Instinct", 2013) plus an uncited near-verbatim Untamed Science echo**, attribution ambiguous between Keren & Wagenaar (1985) and Wagenaar (1988), *Washington Post* HTTP 403 and never confirmed (L140–155). Word-for-word faithful to V6's row and Kills entry. Split tier (Q6 for the statistics, Q3 only hypothetically for the unread paper) landed at L128–131. Quarantine to source-lead **#10** confirmed — I read the register row; it exists and matches. |
| **F3 — one-tailed, with t-statistics** | L198–208 | **YES.** `t(105) = 1.79, p = 0.04, one-tailed` and `t(92) = 1.86, p = 0.03, one-tailed` — identical to V6's verbatim quotation from the Study 2 "Risk taking" / "Information search" subsections. Causal framing explicitly preserved, magnitude softened, exactly as V6 ruled. |
| **F4 — "suggested" and "in part" both restored + simplified-rules caveat** | L236–257 | **YES.** Both hedges are present and bolded in the restored verbatim quote (L241–244), and the note states plainly that the collector's rendering removed both. The omitted material limitation is added verbatim: "**simplified rules (no splitting, doubling down, insurance, etc.)**" and "**the probability of winning was controlled by the computer**" (L250–255), including V6's judgement that this is *more* severe than the disclosed N=12. |
| **F7 — "realistic table pace" struck; "zero baseline" struck** | L393–416 | **YES.** Both struck in the Q2 gap paragraph, which is where V6b located them ("Both sit in the **rewritten coverage-gap paragraphs**, not in the F7 finding block"). The load-bearing consequence is stated correctly and prominently: gap **NARROWED, not cleanly refuted** (L406). V6b's on-the-record praise of the "100% accuracy" discipline is also landed (L412–416) — an honesty-both-ways item the pass was not obliged to carry. |
| **F8 — "in an actual casino" struck; "in full" label; same-study basis** | L552–568, L586–593, L609–614 | **YES** on all three. Struck to "in a casino setting"; the mock-vs-actual contradiction with F7 is stated; permitted citation form given; logged at conflict-register **#28** — which I read and which matches (open, and it independently records the Experiment II/III distinction). "in full" → "abstract, Experiments I–III sentences", with V6b's fairness note that the omitted closer is *pro-training* and so the omission **under-claims**. Same-study basis corrected ("three participants", not "3 of 4") with **the conclusion retained** — precisely V6b's instruction ("I am correcting the stated basis, not the conclusion"). |
| **F1 — §2.1.1 → §1 + no-surrender/no-insurance caveat** | L85–96, L108–113 | **YES.** Locator corrected; Table 4 note / Table 4 Panel A added for the win rates; §2.1.2 caveat added verbatim to V6's finding. The pass also correctly carries V6's point that this caveat *strengthens* the collector's existing no-per-decision-breakdown caveat. |
| **F5 — open question closed in the collector's favour** | L272–278, L286–291 | **YES.** Zero "percent", five "%", one "Table", no quantitative accuracy data — matches V6 exactly. Framed as an upgrade, and the collector's refusal to assert is credited. |
| **F6 — omitted follow-up-questionnaire clause restored** | L314–336 | **YES.** Restored verbatim from V6's publisher-abstract quote. V6's "supports the bridge slightly better than claimed" upgrade and its "best-handled citation" praise are both landed. |
| **F9 — 466 citations confirmed by recount** | L634–641 | **YES.** V6b's `citationCount: 466` recount landed as an upgrade superseding the collector's honest not-recounted flag; V6b's "cleanest of the three" and the preserved "Doubt is cast on" word order are recorded. |
| **F7 tier confirmation (Q3 honest and conservative)** | L508–513 | **YES.** Faithful to V6b's "On the Q3 tier" section, including the point that tiering down to Q3 for n=4 errs *against* the product's interest. |
| **Q1 "corroborated by" → "re-reported in"** | L372–381 | **YES.** V6b's residual double-count risk closed, with the same-study caveat now travelling with the coverage-gaps paragraph — which is the section V6b correctly identified as the one downstream work actually quotes. |

**Result: 0 fabricated corrections, 0 misattributed corrections, 0 unlanded corrections.**

## The two restraint decisions — both adjudicated CORRECT

**1. F8's Experiment II "authentic casino outcomes" is genuinely supported.** Verified from the
source text. The dissertation abstract — which V6b character-diffed against the dossier and found
verbatim exact but for a curly apostrophe — reads: *"Experiment II investigated the relationship
between self-reported strategy and **authentic casino outcomes**. The results found that authentic
casino outcomes varied widely."* Experiment III reads: *"generalized to a **naturalistic setting**.
Following training, three participants won money **in a casino setting**."* The word "authentic" is
the source's own, and it attaches to **Experiment II only**. V6b's downgrade was scoped to Experiment
III and no further. Striking Experiment II's wording as well would have been mechanical
over-application of a correction the verifier never made. **Declining to do so was right.**

**2. V6 dropped a claim element in F2, not the citation.** Verified from V6's own Kills entry, which
is explicit: *"Not a dropped **citation** (Keren & Wagenaar 1985 survives as a real, correctly-cited
study with a verified design description), but the dropped statistical element is the entire
quantitative content of finding F2."* Killing the citation would have overstated V6's finding. The
pass kept the bibliographic details and the design description — exactly what V6 said F2 "may still
be cited for" — and killed only the numbers. **Correct.**

**Spot-check: Q3's coverage gap left untouched.** Confirmed. Lines 427–433 carry **no** `[C6-EC]`
marker and no `[corrected by C6-FP]` marker. V6 ruled Q3 "an honest, verified coverage gap" whose
paragraph "must be left standing"; V6b independently re-confirmed it was untouched by C6-FP. The pass
left it, as instructed.

## Axis 2 — was anything unrelated changed?

No. All 28 markers map to recorded corrections. Every superseded passage I could locate is preserved
struck-through for downstream retraction (F1's locator, F2's bucket/tier/access/statistics, F3's bare
p-values, F4's quote and access note, F5's access and open question, F7's two phrases, F8's setting,
label and basis, F9's not-recounted flag, Q1's "corroborated by", the whole candidate-conflicts
paragraph). All finding IDs are preserved. No verdict was re-judged, no source was added, and the
pass states it made no WebFetch call and appended to no register — consistent with what I found:
source-lead **#10** and conflict **#16** / **#28** all pre-date this pass and carry V6/V6b/C6-FP
attribution, not C6-EC.

## Axis 3 — are bucket, tier, caveat and sufficiency honest?

Yes, and notably the honesty runs in both directions rather than uniformly pessimistic — the pass
landed five upgrades (F5's open question closed in the collector's favour, F6's and F9's figures
confirmed exact, F7's tier confirmed conservative, F4's and F6's access upgraded from
secondary-synopsis to primary-verified) alongside the downgrades. That is the correct calibration for
a pass under pressure to find problems.

**The product consequence is stated, and nothing overreaches it.** The dossier says at L358–362:
*"the **direction** — that passive/conservative errors dominate — still has **one** verified
real-casino source, Carlin & Robinson (F1)… It **no longer has two**, and **no precise magnitude is
supported by anything** in this dossier. Any curriculum weighting of 'which basic-strategy errors
matter most' must be built on F1 alone, as a single-study directional finding."* I checked the whole
dossier for a surviving magnitude claim on this axis and found none.

**Thinness is reported, not padded.** The header (L36–39) states the thinness as a **verified finding
about the literature** — a single n=4 single-subject study, a mock-casino money result, and exactly
one PubMed record for "card counting" in title/abstract. Each is independently corroborated: n=4 by
F7's abstract on two hosts; "mock" by F7's abstract and now consistently by F8; the PubMed count by
V6b's search 1. The focused pass cited **3** against a 4–6 floor and explicitly declined to pad, which
V6b independently evidenced (Crossref/ERIC/Semantic Scholar/PubMed all return no replication-and-
extension). The pass did not pad it either — it added zero sources.

## The V6b loose end — resolved, and independently re-derivable without git

V6b left this open, saying a byte-level diff would require git. C6-EC resolves it by reading. **I can
corroborate the resolution from the record, with no git and no reliance on C6-EC's own assertion:**

- The disputed phrase *"less likely to return following the initial study"* returns **0 hits** in the
  current dossier.
- Decisively, **V6b read the dossier *before* C6-EC ran** and recorded contemporaneously: *"That
  phrase does not appear in the current F6, which reads 'venue participants gave less-complete survey
  responses.'"* That is a pre-pass witness statement, so C6-EC cannot have deleted the phrase and then
  claimed it never existed.
- V6's own record quotes the **source** correctly ("were less likely to return follow-up
  questionnaires") and files the item as *"trivial drift"* in a notes column — the register of a loose
  paraphrase, not of a diffed quotation.

**Conclusion confirmed: F6 was never altered; V6's quotation *of the dossier* was imprecise; the real
defect was the omitted follow-up-questionnaire clause, which is now restored.** The open integrity
question on this card is closed, correctly, and by the cheapest sufficient method.

## The verdict reasoning — assessed, and it holds

C6-EC argues SUFFICIENT survives on two grounds. Both are sound, and the record supports a **stronger**
version of the second than the pass claims for itself.

1. **V6b's downgrades were priced into its own verdict.** Verified: V6b issued SUFFICIENT in the same
   document as its F7/F8 downgrades, and its sufficiency section explicitly writes *"Q2: acquisition
   and speed answered at n=4 (**with my downgrade on 'realistic table pace'**)"*. A verifier that names
   its own downgrade inside its sufficiency reasoning has already discounted for it. Landing that
   downgrade cannot retroactively invalidate a verdict that accounted for it.

2. **V6's F2 drop does not bear on sufficiency.** Verified on both the axis argument and on
   chronology. *Axis:* V6's INSUFFICIENT rests entirely on coverage — its three-part remedy section
   names only the ABA/behavioural-skills-training tradition and the Anderson & Brown transfer landmark,
   and its reasoning is that three declared absences were *missed* evidence. The F2 drop appears in
   Kills, never in the sufficiency section. Sufficiency is judged on where the dossier searched; a
   dropped statistic does not narrow search breadth, and Keren & Wagenaar remains a located,
   correctly-attributed source in the gambling-studies tradition regardless of whether its numbers
   survive. *Chronology (the stronger point):* V6b wrote **after** V6, read V6's record closely enough
   to cross-check V6's quotations of the dossier, and issued SUFFICIENT **over the whole enlarged
   dossier F1–F9** with V6's F2 drop already on the record. The corrections were therefore priced in
   twice over.

One limit worth stating plainly rather than glossing: V6b did not re-verify F1–F6, so the current
SUFFICIENT rests on V6's citation work for those six plus V6b's own breadth searching. That is the
program's intended division of labour, not a defect — and it is what makes the chronology argument
above load-bearing rather than decorative.

**C6's SUFFICIENT verdict survives.**

## Residuals (minor; recorded, not charged against this pass)

1. **The header's "struck through rather than deleted" is very slightly over-general.** F6's *Claimed
   strength* line was replaced rather than struck; the superseded wording is quoted inside correction
   note (a) instead, so traceability survives intact. Cosmetic inconsistency with the header's blanket
   promise.
2. **The Collector self-QA block (L455–466) was not annotated as partly superseded.** Item 1 ("Every
   major claim has ≥1 source with a locatable supporting location") no longer holds for F2's
   directional claim, which now has none. The header banner covers a reader who starts at the top; a
   reader who starts at the self-QA is not warned. Out of the pass's stated remit — no verifier
   recorded a correction against it.
3. **The C6-FP self-QA (L714–716) reads "No existing finding (F1–F6)… was altered".** True *of C6-FP*
   under whose heading it sits, but now easy to misread as a current-state claim. Same category as (2).
4. **Q3's coverage gap (L427–433) retains "I checked this directly against both papers' reported
   content"**, which is no longer strictly true for F2 — nobody in this program has read F2's primary
   text. V6 nonetheless verified the Q3 *gap declaration* itself as honest by independent search and
   directed that the paragraph be left standing, and the pass complied. Correct compliance; flagged
   only so the tension is on the record rather than discovered downstream.

None of (1)–(4) changes a bucket, a tier, a permitted citation form, or the sufficiency verdict.

## Verifier summary

- **Corrections claimed: 21** (across 12 finding/section groups) · **landed: 21** · **not landed: 0**
- **Corrections misstating their underlying V6/V6b ruling: 0**
- **Unrelated text or conclusions changed: 0**
- **Fabricated / self-invented defects: 0**
- **Over-applications: 0** — both declined over-applications independently confirmed correct
- **Under-applications: 0**
- **C6 sufficiency: SUFFICIENT — SURVIVES**
- **Verdict on C6-EC: PASS**
- Register rows to append: **none.** Conflict-register #16 and #28 and source-lead #10 already exist,
  are correctly attributed to V6/V6b, and are correctly cross-referenced from the dossier. No
  duplicate added, per the concurrent-append hazard.
