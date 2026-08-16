# Verification record — A16 comparator re-check

> **Promoted into the tracked archive 2026-08-17 at the `LDB-10` gate**, by owner ruling: a record an
> authority document cites gets promoted, so the citation cannot rot. Produced in
> `journal/raw/_inbox/2026-08-17-a16-comparator-recheck/`, which stays gitignored; this copy is the
> citable one and is what `2026-07-22-product-design-inputs.md` §1.8 and `assumption-register.md`
> A-16 now point at. Promotion makes it durable, not authoritative — it is a verifier's record, and
> the rulings it supports live in those two documents and in `journal/decisions.md`.

- **Date:** 2026-08-17
- **Role:** independent verifier (no Bash, no Edit; write-scope = this directory only)
- **Scope:** ONE claim. Not widened.
- **Source under test:** Bennis, W.M. (2025). "A heuristic based on transparently false
  likelihoods improves gamblers' expected value in the wild." *Mind & Society*, 24(2), 275–301.
  DOI 10.1007/s11299-025-00346-9.
- **Claim under test, as three repo documents render it:** that the blackjack "assume the next
  card is a ten" heuristic is "associated with better expected returns **than unaided play**".
- **Question:** does the source state a comparator for the expected-returns claim, and if so what
  is it, in the source's own words?

The three repo documents were not read as evidence. They are the thing under test and are not
cited anywhere below.

---

## 1. Routes attempted, and what each returned

| # | Route | Outcome |
|---|---|---|
| 1 | `link.springer.com/article/10.1007/s11299-025-00346-9` | **303 See Other** → `idp.springer.com/authorize?...`. Confirms the previously recorded behaviour. |
| 2 | `idp.springer.com/authorize?...` | **302 Found** → `idp.springer.com/transit?...code=...` → `link.springer.com/article/...?error=cookies_not_supported&code=...` |
| 3 | `link.springer.com/article/...?error=cookies_not_supported&code=...` | **Page served. Abstract only; full text paywalled.** Retrieval layer returned a *paraphrase*, not verbatim text — see §2 for why this copy is not quoted. |
| 4 | Re-request of route 3 with a strict verbatim-transcription prompt | Re-entered the 303 → `idp.springer.com` redirect loop. Did not yield a verbatim Springer copy. |
| 5 | `api.crossref.org/works/10.1007/s11299-025-00346-9` | **200. No `abstract` field.** Yielded title, author, funders, licences. Used in §5 (funding). |
| 6 | `api.openalex.org/works/doi:10.1007/s11299-025-00346-9` | **200. `abstract_inverted_index` is null.** OA status: **closed**, no OA URL. |
| 7 | `api.semanticscholar.org/graph/v1/paper/DOI:...` | **200. `abstract: null`**, with publisher disclaimer: `"Notice: The following paper fields have been elided by the publisher: {'abstract'}"`. `isOpenAccess: false`. |
| 8 | `api.unpaywall.org/v2/10.1007/s11299-025-00346-9` | **200. `is_oa: false`, `oa_status: "closed"`, `oa_locations` empty.** No OA copy exists per Unpaywall. |
| 9 | `econpapers.repec.org/article/sprminsoc/v_3a24_...00346-9.htm` | **200. Full publisher abstract, transcribed verbatim.** ← primary abstract copy. |
| 10 | `ideas.repec.org/a/spr/minsoc/v24y2025i2d10.1007_s11299-025-00346-9.html` | **200. Full publisher abstract, verbatim — character-identical to route 9.** Second copy. |
| 11 | `link.springer.com/content/pdf/10.1007/s11299-025-00346-9.pdf` | **303 → idp.springer.com.** No PDF. |
| 12 | `scholar.archive.org/search?q="transparently false likelihoods"` | **0 hits.** No fulltext/PDF in IA Scholar. |
| 13 | Web search for a ResearchGate 2025 full text | No ResearchGate record for the 2025 article surfaced. |
| 14 | Web search for a dissertation / preprint version (Fulbright-Hays DDRA lead) | Surfaced Bennis's 2004 U. Chicago dissertation *title* only ("Experience, values, beliefs, and the sociocultural context in gambling decision making: a field study of casino blackjack") via a ResearchGate listing. **Dissertation full text not opened.** |
| 15 | Web search for a vse.cz (Prague Univ. of Economics and Business) repository copy | No repository entry located. |
| 16 | `substack.casinocognition.com/p/heuristics-biases-and-rationality` — the **author's own** post about this paper, 1 Oct 2025 | **200. Opened.** Reproduces the paper's abstract verbatim (third character-identical copy) and adds the author's own gloss. See §4. |
| 17 | `substack.casinocognition.com/p/expected-value-ev` — same author, 23 Jan 2025 | **200. Opened.** General EV explainer; contains nothing about this paper's comparator. Not used. |
| 18 | `link.springer.com/content/pdf/10.1007/s11299-025-00361-w.pdf` (Reb, Karelaia & Lejarraga 2025, the special-issue editorial; bronze OA per OpenAlex) — via the same 303/302 chain | **PDF obtained and read directly, pages 1–6 (the complete article, 187–192).** Contains a paragraph on Bennis (2025). See §4. |
| 19 | `cdspress.ca/wp-content/uploads/2022/07/Will-Bennis-.pdf` (surfaced by search) | **PDF obtained; pages 1–2 read.** It is **a different paper**: Bennis, W. "Blackjack playing strategies and beliefs: A view from the field," *Journal of Gambling Issues*, DOI 10.4309/jgi.2004.10.1, publication date February 2004. **Not the source under test.** Recorded here only so that no later reader mistakes it for the 2025 article. Nothing from it is used to characterise the 2025 article. |

**Full text of the source under test was not opened.** I could not obtain it by any of the
eighteen routes above. Stating that plainly, in those terms, as the repo's first evidence rule
requires.

---

## 2. What I actually opened

**Opened at abstract level (source under test):**
- The publisher abstract of Bennis (2025), verbatim, from **three independent surfaces** that
  agree character-for-character: EconPapers (route 9), IDEAS/RePEc (route 10), and the author's
  own Substack reproduction (route 16).
- The Springer landing page itself (route 3) rendered **abstract only, paywalled**. The retrieval
  layer returned a summary rather than a transcription, and a re-request for verbatim text fell
  back into the redirect loop. **I therefore do not quote the Springer copy.** Its summary was
  materially consistent with the three verbatim copies (same clause: easier to learn than optimal
  strategy; trivial cost; "correlates with improved expected returns"), which is corroboration,
  not a quotable source.

**Opened at full-text level (adjacent sources, clearly not the source under test):**
- Reb, J., Karelaia, N., & Lejarraga, T. (2025). "Adaptive biases in the wild: Advancing our
  understanding of the nature of biases." *Mind & Society*, 24, 187–192. DOI
  10.1007/s11299-025-00361-w. The editorial introducing the special issue in which Bennis (2025)
  appears. Read in full as a PDF.
- Bennis's own Substack post of 1 Oct 2025 describing this paper.

**Not opened:** the full text of Bennis (2025); the 2004 dissertation; any corrigendum.

---

## 3. The verbatim abstract of the source under test

Transcribed from route 9 and confirmed character-identical at routes 10 and 16. Reproduced in
full and unaltered; no ellipsis, no added emphasis.

> Casino blackjack players learn a simple heuristic that helps them decide when to take
> additional cards, the most common blackjack decision. The heuristic assumes that all upcoming
> cards will be 10-value cards, even though that assumption is true fewer than one in three times.
> The heuristic results in systematic error, but it is also adaptive: it is easier to learn than
> the optimal strategy, the cost of using it is trivial, and its use is associated with better
> expected returns. The heuristic helps explain inconsistent previous findings about blackjack
> likelihood judgments and decision biases. The research relies on mixed methods including
> qualitative data from 1.5 years of ethnographic fieldwork as a blackjack dealer and player, and
> quantitative data from interviews with players about how they play each blackjack hand. The
> heuristic is used as a case to support several theoretical contentions: (a) despite established
> precedent, gambling is not a good domain-general metaphor for decision making under risk or
> uncertainty; (b) even in a small-world domain where outcome likelihoods can be calculated and
> monetary outcomes are unambiguous, using subjective probability to infer expected value may be
> both uncommon and non-normative; and (c) a focus on narrow, domain- and culture-specific
> heuristics and biases—despite their limited scope—offers valuable lessons about how, and how
> well, people make decisions.

The sentence bearing the claim under test, isolated verbatim:

> The heuristic results in systematic error, but it is also adaptive: it is easier to learn than
> the optimal strategy, the cost of using it is trivial, and its use is associated with better
> expected returns.

The title, verbatim:

> A heuristic based on transparently false likelihoods improves gamblers' expected value in the
> wild

### 3a. Positive enumeration of the absence check

Not "I looked and found nothing." Here is exactly what was searched for, and where. The search
domain is the 244-word abstract quoted in full above, plus the title.

| String searched | Occurrences in abstract + title | Where, verbatim |
|---|---|---|
| `than` | **2** | (i) "that assumption is true fewer **than** one in three times" — a base-rate statement, not a comparator for returns. (ii) "it is easier to learn **than** the optimal strategy" — a comparator, but it governs *learnability*, not returns. |
| `unaided` | **0** | — |
| `compar` (compare / compared / comparison / comparative) | **0** | — |
| `relative` / `relative to` | **0** | — |
| `versus` / `vs` | **0** | — |
| `control` (as in control group / control condition) | **0** | — |
| `outperform` | **0** | — |
| `basic strategy` | **0** | The phrase does not occur; the abstract says "the optimal strategy". |
| `expected returns` | **1** | "its use is associated with better **expected returns**" — the clause has no complement. |
| `expected value` | **2** | Title ("improves gamblers' **expected value** in the wild") and contention (b) ("using subjective probability to infer **expected value** may be both uncommon and non-normative"). Neither attaches a comparator. |
| `improves` | **1** | Title only. A bare comparative with no complement; "in the wild" is a setting, not a comparator. |
| `better` | **1** | "associated with **better** expected returns" — bare comparative, no complement. |

The grammatical point, stated precisely because it is the whole finding: the abstract's one
sentence contains **two comparatives and one comparator**. The comparator ("the optimal
strategy") is attached to the *first* comparative ("easier to learn"). The *second* comparative
("better expected returns") is left with no complement. Per dispatch rule 4, the title's
"improves" does not discharge this either — it is itself an undischarged comparative.

---

## 4. Adjacent sources that DO name a comparator — and it is not "unaided play"

These are **not** the source under test. They are recorded separately, and labelled, because
Phase 1 caught a characterisation-by-a-third-party quoted as an author's own words. Neither is
offered as the paper's own text.

### 4a. The author's own gloss (Will Bennis, Substack, 1 Oct 2025) — verbatim

> Remarkably, it outperforms the hit–stand playing strategies used by even the most experienced
> blackjack players, despite the fact that players systematically improve with experience.

> players using this strategy do 0.04% worse than perfect Basic Strategy users, losing 4 more
> cents for every $100 bet

> It also predicts the only two hit–stand choices that blackjack players increasingly get wrong
> as they gain playing experience: the two hit–stand choices the heuristic gets wrong (for you
> blackjack aficionados, that's whether or not to hit a hand total of 12 against the dealer's
> exposed 2 or 3).

> it gets 58 of the 60 hit–stand decisions that are remotely ambiguous correct

> the two choices it gets wrong have a trivial impact on the players' expected losses

> it is easier to teach and learn than the optimal strategy

### 4b. The special-issue editors' summary (Reb, Karelaia & Lejarraga 2025, p. 190) — verbatim

Read directly from the OA PDF, page 190, the paragraph beginning "Bennis (2025)":

> Bennis (2025) takes us on a fascinating journey to the casino, exploring the use of heuristics
> among casino blackjack players. Relying on extensive field observations and quantitative data,
> he documents how blackjack players adopt a simple heuristic to decide when to take additional
> cards, the most common blackjack decision. The heuristic requires them to make a clearly wrong
> assumption (i.e., that all upcoming cards will be 10-value cards, which is true less than
> one-third of the time). Yet, while leading to systematic error, the heuristic is adaptive in the
> sense that it both provides an easier alternative to the optimal strategy and results in better
> expected returns at all levels of playing experience.

### 4c. What these two add up to

Where a comparator is named at all, it is **the hit–stand play that actual blackjack players
actually use — at every level of experience, explicitly including the most experienced players.**
It is not "unaided play."

And the direction runs the other way against the optimal benchmark: on the author's own
arithmetic the heuristic is **0.04% worse than perfect Basic Strategy** — four cents more lost per
$100 wagered. So the finding has two limbs with opposite signs:

- **better** than the hit–stand strategies players actually use, at all experience levels;
- **worse** than perfect Basic Strategy, by ~0.04% of amount wagered.

Both figures above come from the author's public gloss, not from the paper's full text, which I
did not open.

---

## 5. Corrigenda, funding and independence

- **Corrigendum/erratum:** checked at Crossref (route 5), OpenAlex (route 6) and Semantic Scholar
  (route 7). No `update-to` / correction relation and no correction notice appeared in any of the
  three records, and none was visible on the Springer landing page (route 3). This is a
  **negative check at metadata level only** — I could not inspect material appended to the PDF
  itself, because I never obtained the PDF. Treat "no corrigendum" as *unconfirmed*, not
  established.
- **Funding, from the Crossref record (route 5), which I opened:** Fulbright-Hays (award: DDRA);
  Social Science Research Council (award: IDRF; funder DOI 10.13039/100001345). No casino,
  gaming-industry or vendor funder appears in the Crossref funder field. Confirms the
  Fulbright-Hays lead in the dispatch. Independence is not impeached by anything I found; note
  that I read the funder metadata, not the article's own funding statement.
- **Author affiliation on the record:** Will M. Bennis, Prague University of Economics and
  Business (IDEAS/RePEc gives Faculty of Business Administration), matching the dispatch.

---

## 6. Verdict

**The source, at the access level I reached (abstract; full text not opened), states the
expected-returns claim with NO comparator.**

The clause is bare: "its use is associated with better expected returns." The only comparator in
that sentence — "than the optimal strategy" — is attached to *ease of learning*, not to returns.
The words "unaided", "compared", "relative to", "versus" and "control" do not occur in the
abstract or title at all (§3a enumerates the search positively).

**Therefore the rendering "associated with better expected returns *than unaided play*" is not
supported by any text I was able to open.** The qualifier "than unaided play" is an addition.

Further, and this is the finding the dispatch flagged as most likely to be missed: **the two
sources that do name a comparator name a different one.** The author's own gloss and the
special-issue editors both give the comparator as *the hit–stand strategies blackjack players
actually use, at all levels of playing experience, expressly including the most experienced
players*. "Unaided play" connotes untrained or novice play; the actual comparator explicitly
includes expert play, which is a stronger and different claim.

Two directional cautions attach, both of which "than unaided play" obscures:

1. Against perfect Basic Strategy the heuristic is **worse**, not better (~0.04%, ≈4 cents per
   $100). A reader of "better expected returns than unaided play" could reasonably infer the
   heuristic beats the optimal strategy. It does not, on the author's own account.
2. "Associated with" is the abstract's own hedge, and it is a correlational hedge over
   interview-and-fieldwork data. Any rendering that upgrades it to a causal or experimental
   comparison overstates the design.

I did **not** find that the claim is false. I found that its comparator is unsourced as written
and, on the best evidence I could open, mis-specified.

---

## 7. What remains unknown at the access level I achieved

Stated so nobody downstream mistakes this record for a full-text reading.

1. **Whether the full text names a comparator explicitly, and which one.** The abstract does not.
   The paper's Methods/Results very likely do — a 27-page paper reporting an EV figure must state
   what it was computed against — but I did not open them and cannot say.
2. **The exact EV numbers and their baseline.** The 0.04% / 4-cents-per-$100 figures are from the
   author's Substack, not the paper. Whether the paper reports the same figure, against the same
   baseline, is unverified.
3. **Whether "at all levels of playing experience" is the paper's own framing** or the editors'
   compression of it.
4. **Whether the population supporting the EV comparison is the interviewed players** (the
   quantitative arm) **or a simulation** over the heuristic's decision table. The distinction
   matters for how the claim may be worded and for its evidence grade.
5. **Any corrigendum or erratum appended to the PDF itself** (§5).
6. **Whether the 2004 dissertation contains an earlier version of the EV comparison** with an
   explicit comparator. Located by title only; not opened.

---

## 8. Corrections required (for the orchestrator to route; I cannot apply them)

One correction, applying to each of the three documents that carry the claim.

- **Correction:** the phrase "than unaided play" must be removed from the rendering of Bennis
  (2025)'s expected-returns claim. It is not in the abstract and is not supported by any text I
  could open.
- **Supporting verbatim source text:** "The heuristic results in systematic error, but it is also
  adaptive: it is easier to learn than the optimal strategy, the cost of using it is trivial, and
  its use is associated with better expected returns." (publisher abstract, §3).
- **Safe replacement at the access level actually achieved:** render the claim as the abstract
  renders it — *"its use is associated with better expected returns"* — with the comparator marked
  as not stated in the abstract, and with the full text recorded as not opened.
- **If the stronger reading is wanted,** it must be attributed to its actual source rather than to
  the paper: the author's own public gloss ("it outperforms the hit–stand playing strategies used
  by even the most experienced blackjack players") and the special-issue editorial ("results in
  better expected returns at all levels of playing experience"). Both are §4 above, with full
  citations.
- **Recommended accompanying note in any document that uses this to justify teaching the
  heuristic:** on the author's own arithmetic the heuristic is ~0.04% *worse* than perfect Basic
  Strategy. That is the counter-fact to the headline, and it is directly relevant to a training
  product that must decide whether to teach the heuristic or teach the table.

**Remedy route: `editorial`.** No new collection is required to make the three documents correct.
The correct wording is already fully determined by material now in hand (§3, §4). A collector is
needed only if the program decides it wants the *full text* to close the six unknowns in §7 —
that is a separate, optional, `collection` job, and on the evidence of routes 1–18 it will require
institutional or interlibrary access rather than another open-web pass.
