# C7 top-up collection pass — what I searched, found, and could not reach

> Status: RAW COLLECTION — DATA ONLY, not authority (Inbox Rule 0). UNTRUSTED until verified.
> Collector: Claude (Opus 4.8), fresh instance — not the C7 collector, not the V-C7 verifier, not the
> editorial pass.
> Date: 2026-07-22
> Authority: the `collection` remedy in `verification/V-C7.md` Axis-2 (bounded, ~5 new sources).
> Target file edited: `collection/C7-probability-ev-variance.md`, **append-only**, findings F15–F20.
> Tooling constraint (structural, disclosed): **no Bash tool.** No git, no repository inspection, no
> product code executed. Retrieval was web fetch; PDFs the fetch layer saved to disk were then read
> page by page as rendered pages.

## What I read before searching

Per the standing instruction that the program's dominant defect is failing to read what is already
held, I read in this order and in full: `GAP-SPEC.md`; `verification/V-C7.md`; and the whole of
`collection/C7-probability-ev-variance.md` (1,082 lines, in two reads). I did **not** open C1–C6, the
Phase 1 archive, `docs/`, the landing record, or any product source.

**One gap I could close from a source already in hand, and did:** V-C7 quotes the Sezer et al. (2016)
abstract with a marked ellipsis and omits its closing sentence. F14 already carries the abstract in
full. I re-opened the RePEc/IDEAS record myself and confirmed F14's transcription matches the
publisher abstract **character for character, including the closing sentence**. No new finding was
added for it — the material was already correctly held, and adding a citation to avoid reading one
would have been the exact failure this role exists to prevent.

## Sources opened, in dispatch priority order

| # | Source | Route | Depth reached |
|---|--------|-------|---------------|
| F15 | Morewedge, Yoon, Scopelliti, Symborski, Korris & Kassam (2015), *PIBBS* 2(1), 129–140 | City Research Online accepted-version PDF, saved locally | **Full text**, pp. 1–29 read as rendered PDF pages incl. Figures 1–2 |
| F16 | Sellier, Scopelliti & Morewedge (2019), *Psychological Science* 30(9), 1371–1379 | Wharton-hosted PDF, saved locally | **Full text**, pp. 1371–1378 read as rendered PDF pages incl. Table 1, Fig. 1, both footnotes |
| F17 | Weber, Binder & Krauss (2018), *Frontiers in Psychology* 9:1833 | Frontiers open access | Full text via fetch-layer page reader; **three passes**, first discarded |
| F18 | Ladouceur et al. (2001), *J Nerv Ment Dis* 189(11), 774–780 | PubMed record | **Abstract-level only**; two passes, first discarded |
| F19 | Gok & Goldstone (2024), *Cognitive Research: Principles and Implications* 9:33 | PMC11139845 | Full text via fetch-layer page reader; **two passes**, first pass's synthesis discarded |
| F20 | Bennis (2025), *Mind & Society*, DOI 10.1007/s11299-025-00346-9 | Springer, after two redirects | **Abstract-level only**; two passes, first discarded |
| — | Sezer, Zhang, Gino & Bazerman (2016), OBHDP 137, 13–26 | RePEc/IDEAS | Abstract re-confirmed against F14; **no new finding added** |

Six new findings. The dispatch budget was five to eight.

## Three extractions I discarded rather than cite

Recorded because the discards are the substance of the evidence contract, not housekeeping.

1. **Weber et al., first pass.** Returned an abridged four-sentence abstract presented as the whole
   abstract, and a participant total the paper does not print. Discarded entirely; re-read twice with
   literal-quotation-only prompts. F17 quotes only the later passes and **explicitly declines to state
   a combined N**, because 114 + 69 would be my arithmetic — the same defect family as C-C7-006.
2. **Gok & Goldstone, first pass.** Returned a well-organised six-point taxonomy of "design features
   that support student reasoning." That taxonomy is the tool's organisation of the paper, not the
   paper's own sentences. **None of it is in F19.** F19 carries only the abstract and four
   individually re-extracted literal sentences.
3. **Bennis, first pass.** Returned a paraphrase with quoted fragments spliced into it — a
   tool-generated summary, which the contract says is not a source. Discarded; re-fetched with a
   literal-output-only prompt, which produced the full abstract now quoted at F20.

## Numerical corrections made against circulating figures

- **Sellier et al. (2019): 29%, not 19%.** A search-result synopsis reported the field effect as "19%
  less likely." The paper says **29%**, in the abstract (p. 1371) and again in the Discussion
  (p. 1378). I read both. F16 reports 29% and records the discrepancy.
- **V-C7's lead label S-4, "Morewedge & Carey", is a mis-parse** of the author name *Carey K.
  Morewedge*. The paper is Sellier, Scopelliti & Morewedge (2019). Corrected at F16 and flagged in the
  dossier's top-up preamble. The lead was otherwise accurate and the retrieval route worked.

## The most consequential thing I found, and it cuts against the source's headline

V-C7 flagged Morewedge et al. (2015) as "the landmark absent from this dossier" and the closest thing
this project has to evidence that its own format teaches. It is, and F15 carries its effect sizes in
full. But reading the Method and Results rather than the abstract surfaced four things the abstract
does not say, and I want them on the record here as well as in the dossier:

1. **There is no untrained control condition.** Participants were randomly assigned only to *game* or
   *video*. The headline *d* values are within-condition pre-to-post change; the only between-condition
   contrast the design supports is game vs video. **F15 cannot be cited as showing that training beats
   no training.** This is my observation from pp. 14–23, not a limitation the paper states, and it is
   the single claim in this pass I most want attacked.
2. **On knowledge, the video beat the game — in both experiments** (Exp. 1 F(1,240)=15.52, p<.001;
   Exp. 2 F(1,235)=11.07, p<.001). Interactive practice won on bias *commission* and lost on bias
   *recognition*. That dissociation is absent from the abstract.
3. **On anchoring there is no game advantage at all** — "Fs < 1, ps > .62" — and the video's point
   estimates are larger on both anchoring and representativeness. "Games produced larger effects than
   did videos" is true of overall bias, not of every bias.
4. **Funder and authorship.** Funded by IARPA BAA-11-03, with the six trained biases "identified by our
   program sponsor"; two co-authors work for the contractors that built the game, and the paper credits
   the game to an author group including them. **The evaluated intervention was built by the evaluating
   authors.** I found no Declaration of Conflicting Interests in the accepted manuscript. Partially
   offsetting: sample sizes were declared to the sponsor in advance and an independent third party
   re-analysed the data.

**And the limit that matters most for this project: none of the six trained biases is outcome bias, and
none is a probability, EV, or variance concept.** F15 is near on *format* and far on *content*. G4 is
not improved by it.

## Absence claims — each searched at least two ways and checked at two hosts

The previous pass's worst defect was an absence claim that did not survive. These are the three I am
willing to state, with the routes.

- **No controlled study teaching EV reasoning and measuring improvement in actual card-game play.**
  Searched by general web query on blackjack/EV/training, and separately through the training-transfer
  literature reachable from F15/F16. Returns are machine-learning papers about solving blackjack,
  practitioner and course material, and F20. **Survives.** F20 does not overturn it; it reframes it, by
  arguing EV inference is not what players use.
- **No debiasing-training study targeting outcome bias.** F15's bias list checked twice against the
  paper itself (abstract p. 2, Highlights p. 3) rather than any summary. **Survives.** G4 is unchanged.
- **No randomised trial of instruction in randomness for gambler's fallacy or illusion of control in a
  *non-clinical* adult population.** Searched by general web query and again restricted to
  `pubmed.ncbi.nlm.nih.gov`. What exists is clinical: F18, personalized-feedback and warning-message
  trials, and Luquiens et al. (2025, PMID 39819891), a 185-participant RCT reporting a null whose active
  ingredient is **inhibition training, not instruction in randomness**. I opened its PubMed record and
  deliberately did **not** carry it as a G5 finding, because its mechanism is not the one G5 asks about.
  **Survives.**

## Failed retrievals

| Target | Barrier | What I therefore cannot establish |
|---|---|---|
| Bennis (2025) full text | Springer 303 → `idp.springer.com` → `?error=cookies_not_supported`; abstract served, article not | F20's N, method detail, and the magnitude of the expected-return association |
| Morewedge et al. (2015) version of record | Not attempted — I read the accepted manuscript, which carries the repository's own "may differ from the final published version" warning | Whether the typeset article's numbers, pagination, or conflicts declaration match what I read |
| Ladouceur et al. (2001) full text | Not attempted (lww.com / ovid.com expected paywalled) — a choice, not a barrier | F18's effect sizes, attrition, session count, control-arm follow-up |
| McDowell & Jacobs (2017) full text | Still unobtained; rows 1–2 of the dossier's table stand | The pooled effect. **F17's 24%/4% is a secondary attribution and does not substitute** |
| Sezer et al. (2016) full text | Not attempted by this pass | The `collection` half of C-C7-010 remains open and is still the top retrieval target |

## Scope compliance

- **G2 not reopened.** V-C7 rated it SUFFICIENT; I did not search it, cite to it, or touch its rows.
- **F1–F14 not re-verified and not re-collected.** I re-opened exactly one already-held source — the
  Sezer RePEc abstract — to confirm F14's transcription, added nothing, and changed nothing.
- **C1–C6 not reopened.** F20 is a blackjack source; I state at the finding that it does not amend or
  re-verify C6, and is carried under C7 because it answers a G3 question about teaching EV.
- **CFL-007 not touched.**
- **No design.** No activity, curriculum, sequence, or product change is proposed in F15–F20 or here.
- **Append-only.** F1–F14, every `[LANDED C-C7-…]` marker, and every struck-through superseded wording
  are untouched. Both pre-existing tables retain their row counts (12 failed-retrieval rows, 6
  sufficiency rows); every note this pass added sits in prose outside a table.
- **Citation cap breach, disclosed not hidden.** The original brief capped citations at 15; the dossier
  now holds 20. The cap belonged to the first collection pass, which V-C7 ruled insufficient and
  remedied with a bounded follow-on collection. The breach is recorded in the dossier header.

## What I would tell a verifier to attack first

1. **F15's no-control-arm claim.** It is my reading of pp. 14–23, not the paper's stated limitation.
   If a control arm exists in a section I did not read, F15's caveat is wrong and must be struck.
2. **F17's population inference** — that a mathematics-teaching cohort is unusually schooled in
   probability notation and therefore arguably *less* representative than the paper implies. Labelled as
   my inference at the finding, but it is an inference.
3. **F19 and F17 were read through the fetch layer's page reader, not as PDFs I opened.** Both had a
   first pass discarded. They are the two findings in this pass with the weakest retrieval provenance.
4. **F20 is D1 and Q4 simultaneously** — the near-transfer/low-quality inversion. If anything in this
   pass gets over-cited downstream on the strength of its blackjack relevance alone, it will be this.
