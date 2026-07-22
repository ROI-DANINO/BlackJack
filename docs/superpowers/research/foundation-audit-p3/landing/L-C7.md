# Landing Record: L-C7 — editorial corrections landed into the C7 dossier

> Editor: Claude (Opus 4.8), editorial-corrector instance — not the C7 collector, not the C7 verifier.
> Date: 2026-07-22
> Verification record landed from: `journal/raw/_inbox/foundation-audit-p3/verification/V-C7.md` (read
> in full; **not modified** — verification records are immutable in this program).
> Target edited: `journal/raw/_inbox/foundation-audit-p3/collection/C7-probability-ev-variance.md`.
> Files written by this pass: that dossier, and this record. Nothing else.
> Capability boundary: no Bash, no WebSearch. Re-reading of already-cited sources only.

## Scope actually executed

- **Landed:** C-C7-001 … C-C7-009, plus the **re-wording half** of C-C7-010.
- **Not attempted, still open:** the **`collection` half** of C-C7-010 — obtaining the Sezer et al.
  (2016) **full text**. No retrieval of any source not already named in the dossier was attempted.
- **Not attempted, still open (not mine):** V-C7's Axis-2 sufficiency verdict (INSUFFICIENT; leads S-2
  through S-8). Editing cannot close a coverage gap and I did not pretend otherwise. In particular I
  did **not** soften any G3, G5 or G6 negative to make the dossier read better.

## Verification-before-implementation

I re-opened **every** source that a correction turns on. Nothing in this pass was landed on the
verifier's authority alone; there are **zero** LANDED-ON-VERIFIER-AUTHORITY items.

Sources I personally re-opened, and how:

| Source | Route | How read |
|---|---|---|
| Sedlmeier & Gigerenzer 2001 | `apa.org/pubs/journals/releases/xge-1303380.pdf` | Text extraction failed (scanned JBIG2). Read printed **pp. 388, 395, 397 as rendered page images** |
| Hertwig, Barron, Weber & Erev 2004 | `pure.mpg.de/rest/items/item_2504664/component/file_2520409/content` | Text extraction failed. Read printed **p. 538 as a rendered page image** |
| Wulff, Mergenthaler-Canseco & Hertwig 2018 | PubMed PMID 29239630 | Abstract, targeted verbatim extraction |
| Baron & Hershey 1988 | `sas.upenn.edu/~baron/papers.htm/judg.html` | HTML, targeted verbatim extraction (abstract + Exp. 5 Method) |
| Sundali & Croson 2006 | `sas.upenn.edu/~baron/journal/06001/jdm06001.htm` | HTML, targeted verbatim extraction |
| delMas, Garfield & Chance 1999 | `jse.amstat.org/v7n3/delmas.cfm` | HTML, targeted verbatim extraction of all four percentage sentences |
| Hogarth & Soyer 2011 | PubMed PMID 21639669 | Full abstract, read to its final sentence |
| Sezer, Zhang, Gino & Bazerman 2016 | `ideas.repec.org/a/eee/jobhdp/v137y2016icp13-26.html` | Publisher abstract, full verbatim |

Note on the Sezer retrieval: the paper is **already cited in the dossier** (as failed-retrieval rows 5
and 6 and as the dossier's top overflow lead). Opening it to confirm V-C7's quoted abstract is
re-reading an already-cited source, not collection. I did not attempt the full text.

Two PDF sources (Sedlmeier & Gigerenzer; Hertwig et al.) would not yield text to the fetch layer at
all. Both corrections that depend on them (C-C7-001/002/009 and C-C7-003) were therefore settled by
reading the **rendered page images** directly — the same method V-C7 used, arrived at independently.
This matters: C-C7-003's whole substance is a minus sign that a text layer had rendered inconsistently.

## Per-correction outcome

All ten items reproduced against the dossier **and** against the source. None was found spurious.

| ID | Outcome | Anchor in the dossier |
|---|---|---|
| C-C7-001 | **LANDED** | F1 → "Claimed strength" → **Study 1a** bullet, the cell-count parenthetical |
| C-C7-002 | **LANDED** | F1 → "Claimed strength" → **Study 2** bullet, the long quoted passage |
| C-C7-003 | **LANDED (with one deliberate deviation — see below)** | F3 → "Claimed strength" → Recency bullet + the adjoining "Transcription flag" paragraph |
| C-C7-004 | **LANDED** | F4 → "Claimed strength" → "Recency is conditional, from the abstract" bullet |
| C-C7-005 | **LANDED** | Four loci: F7 headline; F7 "Transfer distance" line; Head statement ("card-and-money experiment"); Coverage-gaps "nearest tasks" bullet. Also re-worded inside the sufficiency table's G4 cell |
| C-C7-006 | **LANDED** | F9 → "Caveats / population / domain limits", the "45 of the 139 gamblers" clause |
| C-C7-007 | **LANDED** | F11 → the "Numbers reported by the fetch layer that I flag as lower confidence" bullet |
| C-C7-008 | **LANDED** | F12 → "Claimed strength, verbatim, in full" label and the end of the quoted abstract |
| C-C7-010 (re-wording half) | **LANDED** | Seven loci: Head statement; new **F14**; the G4 COVERAGE GAP heading, its Sezer bullet and its closing paragraph; the coverage-gaps G4 bullet; failed-retrieval rows 5–6 (cell text only) plus a prose note under the table; the "searched and came up empty" outcome-bias bullet; the sufficiency table's G4 cell; the Sezer overflow lead; the header citation count and the self-QA count line |
| C-C7-010 (collection half) | **NOT ATTEMPTED — out of scope, remains open** | Sezer et al. 2016 full text |

### What each correction actually turned out to be, at the source

- **C-C7-001 — confirmed.** p. 388, verbatim: *"We trained 14 participants in the grid condition, 15
  participants in the tree condition, 20 participants in the rule training condition, and we had 5
  participants in the control condition."* and *"Four of the five members of the control group took
  part in the second session."* The dossier's "4 control at training" conflated the returning subset
  with the assigned cell.
- **C-C7-002 — confirmed.** p. 395 prints *"Here, the immediate training effect of a median of 93%
  Bayesian solutions remained stable…"* and *"…ended up at a median of 50% after 15 weeks."* The
  dossier dropped "a median of" and substituted "with" for "at", inside quotation marks. No meaning
  change; verbatim contract breached.
- **C-C7-003 — confirmed, sign is negative.** p. 538 prints *"t(49) = −3.1, p = .003, two-tailed."*
- **C-C7-004 — confirmed.** The PubMed abstract prints *"Fourth, the occurrence of recency was
  contingent on decision makers' autonomy to terminate search, consistent with the notion of optional
  stopping."* "we found that" is an interpolation.
- **C-C7-005 — confirmed, and it is a real overstatement.** This is one of the two items my brief
  flagged as a judgement call, so I checked it as a claim rather than an order. The abstract prints
  *"Subjects were given descriptions of decisions made by others under conditions of uncertainty,
  together with outcomes of those decisions."* and Experiment 5's Method opens *"Suppose you are in a
  psychology experiment with another student (of your own sex) from this class."* No cards were dealt
  and no money was staked. Against the dossier's **own** D1 definition — which requires "money or
  money-like stakes" — the D1 rating fails. **D2 is the correct rating and I landed it.** I record
  that D3 was arguable (the task is evaluative, not a gamble at all), but D2 is defensible because the
  content is an explicit probability comparison between two card decks, and I did not substitute my
  judgement for the verifier's where both are defensible.
- **C-C7-006 — confirmed on both counts.** The paper prints the 45 itself: *"Of the remaining 45
  gamblers, 31 of them either only won or only lost at the table in our sample while 14 played for
  only one spin of the wheel."* The collector's disclaimer was honest in form but wrong in substance,
  and its stated *reason* ("insufficient variation to classify") is not the paper's reason.
- **C-C7-007 — confirmed; the second of the two judgement calls, and the verifier's reading holds.**
  All four figures verified at the journal archive: initial activity *"only 22% of the items on the
  pretest, increasing to an average percent of about 49% on the posttest"*; revised activity *"from
  having correct or good reasoning on 16% of the pretest items to having correct or good reasoning on
  72% of the posttest items"*; and the genuine between-activity posttest contrast *"the initial
  activity students chose the correct pair of graphs on an average of 16% of the posttest items, the
  new activity students were correct on 36% of the posttest items."* The defect is real and is made
  worse by an accident of the data: **16% appears in both roles** — as the initial activity's posttest
  correct-only figure and as the revised activity's pretest good-reasoning figure — so the original
  sentence reads as one continuous between-activity comparison when the second half is within-activity.
  As written it overstated the redesign's advantage. Flag cleared at the same time.
- **C-C7-008 — confirmed.** The PubMed abstract ends *"We conclude by discussing theoretical and
  practical implications."*, absent from a quotation labelled "in full". I took V-C7's offered second
  option (append the sentence) rather than weakening the label, because the label is then true.
  V-C7's parallel check on F5 came back clean and I left F5 untouched.
- **C-C7-010 — confirmed, and it is the material one.** The RePEc/IDEAS record returned the publisher
  abstract on the first try. The dossier's "no evidence retrieved" and "cannot state what this paper
  found" were false as of that route existing.

## Deviations, and one place where I departed from V-C7's instruction

1. **C-C7-003 — I struck the "Transcription flag" paragraph rather than deleting it.** V-C7 asked for
   outright deletion, reasoning that a resolved flag invites a downstream reader to re-open a settled
   question. This program's editorial rule is that superseded wording must stay **visible and struck**
   so a reader can reconstruct the pre-correction claim. I resolved the conflict in favour of the
   program rule and neutralised V-C7's concern explicitly: the landing marker states the flag is
   **resolved and must not be re-opened or acted on**. Net effect is the same; reconstructability is
   preserved. Flagged here so the confirming agent does not read this as a partial landing.

2. **C-C7-010 — I read the "abstract-level addition" as inside the editorial half.** My dispatch scoped
   me to "the re-wording half". V-C7's own remedy line is explicit that *"the abstract-level addition
   needs no new collection pass"* and reserves `collection` solely for the full text. I therefore added
   **F14** carrying the verbatim abstract, because the re-worded head statement, coverage-gap section
   and sufficiency row all assert what the paper reports, and an assertion with no anchored finding
   behind it is exactly the unanchored-claim defect this role exists to prevent. If the orchestrator
   disagrees, F14 is a single contiguous block and is trivially removable; the (a)/(b)/(c) re-wordings
   would then need re-pointing.

3. **Citation count moved 13 → 14.** Updated in the header and in the self-QA checklist, both marked.
   Still inside the dossier's stated hard cap of 15.

4. **I did not touch the collector's sufficiency self-assessments (G1–G6 verdicts).** V-C7 rules the
   dossier INSUFFICIENT and disagrees with the collector on five of six questions. Re-scoring a
   collector's self-assessment is not an editorial correction and was not among C-C7-001…010. I noted
   the divergence in prose beneath that table and pointed to V-C7 rather than transcribing its verdict.

5. **Table discipline.** No marker was placed inside any table cell. Both tables in the dossier retain
   their exact original row counts (failed retrievals: 12 data rows; sufficiency: 6 data rows) and cell
   counts. Where C-C7-005 and C-C7-010 required cell **text** to change, I edited the text in place and
   put the `[LANDED …]` marker in prose immediately outside the table. The RePEc route that V-C7 asked
   to have "added" to the failed-retrieval table is recorded in prose under the table, deliberately, so
   that no row was added.

## Things I checked and deliberately did NOT change

Recorded because a corrector who only reports faults is not calibrated.

- **F5's "verbatim, in full".** V-C7 checked it and found it clean; C-C7-008 explicitly exempts it. Left
  alone. I did not re-open PMID 16536666 — no correction turns on it.
- **F13's "lowest-confidence citation" self-flag.** V-C7's calibration note U-3 says it is over-cautious
  and should be lifted. That is an **upgrade**, not one of the ten corrections, and I did not re-open
  F13 myself. Left exactly as written, with a note in the self-QA marker saying why. **This is a live
  loose end**: the dossier still discounts a citation the verifier found to be among its cleanest.
  Someone should decide whether to land U-3; it needs no new collection.
- **F4's "Correction of a widely circulated figure" block** (9.7 / −13.4 / "about 20"). V-C7 confirmed
  it against the rendered pages (upgrade U-1). It is correct as written. Left alone.
- **F2's refusal of the "24%/4%" figures.** Procedurally correct (upgrade U-2). Left alone. I did **not**
  import the figures via the secondary attribution V-C7 logged as lead S-3 — that would be collection,
  and it would also launder a secondary attribution into a primary citation.
- **V-C7's "non-material notes"** (F3's quotation-terminal punctuation; F4's dropped italic emphasis on
  "strongly"; F13's limitations ellipsis; the C6 shape-only read). V-C7 states these are not gated and
  carry no landing loop. Left alone.
- **The candidate-conflicts section.** V-C7 returns conflicts as rows for the orchestrator and states
  they are "not appended to any register by me." I did not append them either.
- **F7's six quoted strings, F8's four flagged numbers, F10's figures, F13's F-statistics.** All
  confirmed exact by V-C7. Not re-opened, not changed.

## NOT-REPRODUCED

None. All ten corrections reproduced against both the dossier text and the source.

## Blockers

None for the editorial scope. The open items below are **not** blockers on me — they are outside an
editorial remedy by construction:

- C-C7-010 `collection` half: Sezer et al. (2016) full text. Requires institutional access or a route
  past ScienceDirect; abstract-level is all this dossier can honestly carry until then.
- V-C7 Axis-2: the dossier is INSUFFICIENT on G1, G3, G4, G5, G6. Leads S-2 … S-8 are named with routes.
  V-C7's own framing is worth carrying forward intact: the dossier is **systematically pessimistic on
  trainability**, and that pessimism is an artefact of where its search stopped. Nothing in this
  editorial pass changes that, and landing these nine corrections must not be read as having done so.
