# C4 Remediation Collection Report — one-citation sufficiency top-up

> Collector: Claude (Opus 4.8), pass id **C4-RT** | Date: 2026-07-20
> Status: RAW COLLECTION — DATA ONLY, not authority (Inbox Rule 0). **UNTRUSTED until verified.**
> This is a claim awaiting scrutiny. A separate agent instance will independently re-check it.
> I am the collector, not the verifier, and nothing below is described as verified.

## Authorisation for this pass (recorded per brief)

Program **Amendment 6** permits an additional focused pass where the missing evidence is **already
specifically identified**. It was. `verification/V4b-chesscom-khan-toppedup.md`, §"If INSUFFICIENT"
item 1, names the source exactly — author, year, title, journal, volume, issue, pages, DOI, and an
open-access galley route — and item 3 scopes the remedy to "**one citation, roughly half a page**".
The citation was denied entry in Phase 1 purely by the one-pass rule, for consistency rather than on
merit. This pass collects that one source and nothing else.

## What was collected

**F13 — Kelly, D. P., & Rutherford, T. (2017). "Khan Academy as Supplemental Instruction: A Controlled
Study of a Computer-Based Mathematics Intervention." *International Review of Research in Open and
Distributed Learning*, 18(4), 70–77. DOI 10.19173/irrodl.v18i4.2984.**

- **Citation count added: 1.** Sources added: 1. Nothing else was collected.
- Tier proposed: **Q3** — quasi-experimental, not randomised. The word "Controlled" in the title must
  not be read as randomisation; the paper's own Design section says the assignment was non-random.
- Status bucket proposed: Evidence-backed.

## How it was obtained (route, not summary)

Declared plainly because the program treats retrieval route as load-bearing:

1. `irrodl.org/index.php/irrodl/article/view/2984/4199` (the PDF galley V4b named) — fetched, **did
   not extract**; returned navigation chrome only. Recorded as a failed route, not worked around silently.
2. `irrodl.org/index.php/irrodl/article/view/2984` — landing page fetched: title, authors, affiliation,
   volume/issue, DOI, publication date, CC BY 4.0 licence, galley list.
3. `irrodl.org/index.php/irrodl/article/download/2984/4221?inline=1` — inline HTML galley fetched.
   Useful for orientation but **returned a paraphrased summary, not verbatim text; no quote in the
   dossier rests on it.**
4. **`https://files.eric.ed.gov/fulltext/EJ1146230.pdf` — the ERIC full-text PDF was retrieved and read
   directly, page by page, all 8 pages (pp. 70–77), including front matter, tables, and back page.**
   Every quotation, statistic, table value and page number in F13 comes from this read.

I had no `pdftotext` route available under this pass's tool restrictions, so the PDF was read directly
rather than converted and grepped. I flag this as a **different instrument** from the one V4b used, so
that the verifier can weigh it: my page attributions are from the printed page numbers on the article
itself (70–77), which match the journal's pagination.

## What the source says (the honest characterisation)

**Design.** Post-test-only control-group **quasi**-experimental. Unit of assignment is the **class**,
and the assignment rule was literally "based on whether the classes were taught by the lead author."
No randomisation, **no pre-test**, no covariates. Duration **four weeks**. N = 114 seventh graders in
one large suburban charter school in North Carolina, all taught math by the same teacher.

**Comparator.** Two **active** controls — this is the dossier's only equal-time comparison. Math
enrichment (n = 23), "general supplemental math instruction… not planned in collaboration with the math
teacher," delivered "at the teacher's discretion"; and ELA enrichment (n = 52). Treatment (n = 39) used
Khan Academy ≥ 30 minutes per class, self-directed, no assigned topics. **Limit on "active":** the math
control is unstructured rather than a specified alternative protocol; the authors themselves later
attribute the flat result partly to "a general lack of structure in enrichment classes."

**Result — null on all three comparisons.**
- Abstract: "In both cases, we found no statistically significant differences in student test scores."
- KA vs combined controls: control M = 72.22 (SD 14.750), treatment M = 73.75 (SD 14.280), MD = 1.53, **p = .596**.
- KA vs traditional supplemental math: **t(60) = -1.009, p = .842**.
- Any math supplement vs ELA supplement: **t(112) = .649, p = .259**.
- Conclusion: "This study did not find associations between use of Khan Academy as supplemental
  instruction and higher math test scores; however, only one parameter of student success was measured."
- Discussion, the authors' own framing of the null: "our failure to find an association between Khan
  Academy and math test scores is of note," and "the use of Khan Academy was found to be no worse than
  more traditional forms of supplemental instruction."

**Limits, stated at full strength.** No power analysis; the active-control cell is **n = 23** and the
key contrast runs at t(60) — the null is compatible with a real small-to-moderate effect going
undetected. The outcome is **21 multiple-choice items drawn from a released grade-SIX** NC End-of-Grade
assessment given to **seventh** graders at a school explicitly described as above the state and county
average — a low-sensitivity, low-ceiling instrument that the paper does not discuss as a limitation.
Four weeks is a short dose. Single school, single grade, single math teacher. The authors: "This study
does not present generalizable data and is limited in scope."

**Funding / independence — the disclosure check the brief singled out.** I read all eight pages
including front matter, end matter and the back page. **The paper contains no funding statement, no
acknowledgements, no competing-interests declaration and no COI statement of any kind.** The back page
carries only the Athabasca University logo and the CC BY mark. Authors are **NC State University**; no
Khan Academy affiliation, no commissioning relationship, no data-sharing arrangement, no site
co-selection, no acknowledgement of Khan Academy staff appears anywhere. **Therefore the accurate
statement is: independent by authorship and institution, with funding and COI *undisclosed* rather than
disclosed-and-clean.** That is weaker than F12 (which affirmatively declares no support and no financial
interests) and categorically different from F11 (which discloses a Gates→Khan funder relationship on its
own p.iii). I have not recorded it as "confirmed clean" and it should not be upgraded to that.

**The design-independence caveat that cuts the other way, carried as required.** The lead author
**taught the treatment class and delivered the intervention**, was an existing Khan Academy advocate,
and states the study's origin was "to determine the efficacy of his decision to use Khan Academy and
justify continued use." **Teacher and condition are fully confounded.** IRB approval was retroactive
and exempt; data predate the lead author's university affiliation. My judgement, flagged as judgement:
this is a real internal-validity threat, but its bias direction runs **toward** the treatment, so it
does not license waving the null away — while equally not making the null stronger than its power allows.

**Two internal numerical inconsistencies found on the first-hand read**, reported because they were
found and not because they change anything: (i) the narrative's treatment mean (M = 73.75, SD = 14.280)
disagrees with Table 1 and Table 2 on the facing pages (Treatment M = 73.18, SD = 14.32), and Table 1's
group means do not reconcile with a combined-control mean of 72.22; (ii) the reported p-values are not
conventional two-tailed values for the stated t and df — t(60) = -1.009 with p = .842 in particular is
not a two-tailed p, and the paper never states its tail convention. **Every comparison is null on any
tail convention**, so the direction of the result is unaffected.

## Corrections to prior renderings of this source

V4b's rendering of Kelly & Rutherford checked out against the full text on every figure and quotation I
tested — the abstract sentence, all three test statistics, the MD, the lead-author sentence, the
conclusion fragment, the "post-test only control-group quasi-experimental design" phrase, and the
n ≈ 114. Recorded plainly rather than as a clean sweep. Three things V4b did **not** record, now added:
the below-grade-level outcome instrument, the absence of any funding/COI statement (as distinct from a
clean one), and the two internal numerical inconsistencies.

## Scope discipline

Two leads were noticed and deliberately **not chased**, per the one-citation budget — recorded as leads
only, unretrieved, unverified, and not asserted: **Böhmer, Burns & Crowley (2014)**, a Cape Town RCT
cited in F13's own reference list in which Khan Academy formed part of an after-school package (F13's
authors note the package confounds attribution); and **Weeraratne & Chin (2018)** / **Vidergor &
Ben-Amram (2020)**, carried forward unchanged from V4b, which also declined to verify them.

## Append-only compliance

- The only file modified in the dossier tree is `C4-chesscom-khan/dossier.md`, and the modification is a
  **pure append** after the final line of the C4-FP section. **No pre-existing text was edited**,
  including the header citation-count line, the Overflow-leads line, the self-QA checkboxes, the
  Sufficiency statement, and the `[corrected by C4-FP]` coverage-gap bullet.
- Consequence, declared rather than fixed: the header still reads "total 12/15" and is now stale. The
  true count is **13 findings / 9 distinct sources**. V4b's item 3 asked for the coverage-gap bullet to
  be **re-stated in place**; the append-only instruction in this pass's brief overrides that, so the
  restatement was made as a **new appended section** ("What this citation changes in the dossier's
  conclusions") instead. This divergence is flagged for the verifier rather than silently resolved.
- The two Phase 1 corrections that ran in the dossier's favour (F12's free PMC full text confirming
  n = 3 and a clean funding declaration; F10 requiring no downgrade) are **not reversed**, and the
  appended text says so explicitly. V4b's two strength downgrades (F11 author-independent only; F12's
  Q2 warrant struck) are **carried forward as verification results in the appended narrative**, not
  applied as edits to F11/F12 themselves — again because this pass is append-only.
- Nothing was written outside `journal/raw/_inbox/foundation-audit-p1/`. No register was written to.
- No git command of any kind was run. No build, test, or install command was run. Bash was used once,
  to `ls` two directories in the audit inbox.

## Confidence flags (under-claiming deliberately)

- **High confidence:** every quotation, statistic, table value and page attribution in F13 — read
  directly from the ERIC full-text PDF this session.
- **Medium confidence:** the two internal-inconsistency observations. The narrative-vs-table mean
  discrepancy is plainly visible on p.74–75 and I am confident it exists; my inference that the
  p-values are one-tailed is arithmetic reasoning about values the paper reports, not a statement the
  paper makes, and I have framed it that way.
- **Explicitly a judgement, not evidence:** the claim that the lead author's advocacy biases *toward*
  the treatment and therefore strengthens rather than weakens the null's credibility. Reasonable, and
  labelled as judgement in the dossier.
- **Not claimed:** that Kelly & Rutherford is the only such study in existence. The supportable claim
  is that it is the only independent active-control comparison **located by this program**.
- **UNVERIFIABLE items:** none. The source was reached and read in full.

---

## ORCHESTRATOR CORRECTION NOTICE — appended 2026-07-20, after V4c and C4-ED

**This report is preserved as a historical record of what the C4 collection pass claimed at the time
it ran. It is NOT corrected in place, and it is NOT authoritative.** The dossier is authoritative.

One claim in this report is **known false** and was corrected in the dossier by the C4-ED editorial
pass (V4c defect **D1**): the description of the source's **back page**. The dossier carries the
corrected version; do not propagate this report's wording.

Ruling on why this report was annotated rather than edited: a pass report records what an agent
found and believed *at the time*, and rewriting it would destroy the evidence trail that let the
program detect the error at all. But an uncorrected false claim sitting in an untracked file is how
errors propagate — the C2 case this same week proved that a correction recorded in one place and not
applied in another is not a correction. Hence: preserved, and flagged at the point of use.

**Other C4 corrections applied to the dossier by C4-ED, none of them reflected in this report:**
F11 downgraded to *author-independent only*; F12's Q2 tier-warrant struck (reason replaced, tier
retained) while its access and funding resolved **clean**, making F12 the strongest of the three
C4-FP sources on independence rather than the weakest; the coverage-gap bullet re-stated; D2–D5
applied; header and in-body source counts reconciled to **13 findings / 15 distinct sources**, which
places C4 **exactly at the hard source cap**.
