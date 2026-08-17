# Streak mechanics — bounded evidence collection for `LDB-06` divergence 6

> **Status: promoted 2026-08-17 — tracked and citable, and NOT authoritative.** Promoted from
> `journal/raw/_inbox/2026-08-17-streak-mechanics-research/`, which retains the working copy, on the
> `foundation-audit-p1` precedent (`journal/docs-map.md:80`: *"Tracked and citable; the git-ignored
> inbox holds working copies only."*). Promotion moves this out from under **Inbox Rule 0** — it is no
> longer raw inbox material — and changes **nothing** about its provenance below. It remains evidence,
> never authority: it cannot outrank approved decisions, code behaviour, or authoritative specs.
>
> **Why it was promoted rather than left in the inbox:** two tracked documents rest on it —
> `docs/superpowers/specs/2026-08-08-session-composition.md` D8 and `A-29` in
> `docs/superpowers/specs/assumption-register.md`. Both carry their load-bearing claims inline and
> stand without this file, so the promotion buys durability of the *detail*, not of the claims.
>
> **What it decided:** `LDB-06` §12 divergence 6, struck and replaced 2026-08-17 — the up-only streak
> dropped, a forgiving weekly streak deferred to the account. Record: `journal/decisions.md`,
> 2026-08-17.

**⚠ Provenance — read before citing anything here. Stated because this repository's founding error
class is describing a source nobody opened.** This document is the **relayed report of an
`audit-collector` subagent** dispatched 2026-08-17. **Nobody in this repository has opened any of the
18 external sources cited below.** Every claim is at one remove: the agent says it opened these
sources and read the page ranges named. **No verifier has re-checked any of it.** Being tracked does
not make it verified — promotion changed its location and its Rule 0 status, nothing else. A verifier
wanting the same page images will find five PDFs the fetch tool wrote outside the repository at
`~/.claude/projects/-home-roking-Desktop-Projects-blackjack/afe06012-7b16-430a-8283-f954f542444f/tool-results/`
(`webfetch-1786930542825-occpmm.pdf` Silverman & Barasch; `webfetch-1786931008714-jarsv2.pdf` Moldon
et al.; `webfetch-1786930882532-2os202.pdf` Lally et al.; `webfetch-1786931271087-8i5cq8.pdf`
Aulagnon et al.; `webfetch-1786931495247-vix5h3.pdf` Gal & Rucker).

**Why this file was written by the orchestrator rather than the agent.** The agent's `Write` was
refused by the harness (*"Subagents should return findings as text, not write report files"*), so it
returned the dossier as text. Transcribed here to stop the collection being lost. **The transcription
itself is a trust step nobody has checked.**

**The bounded gap.** Divergence 6 proposes an "up-only streak" — a counter of distinct calendar days
practised, which by construction never falls — justified against a single relayed one-line source
(`ACT:388`) rejecting "loss-framed streaks". Five questions were asked and no wider.

---

## A. The three findings that bear on a product decision

### A1. `ACT:388`'s research ground is misattributed, and its real content points the other way

Read from material already in this repository:
`docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md:388` cites exactly
one research source, `SCI-007`, registered at `:45` with that file's own limitation — *"Mostly
correlational samples; does not prove a specific interface mechanic causes autonomous motivation."*

`SCI-007` is **Howard, Bureau, Guay, Chong & Ryan (2021), "Student Motivation and Associated
Outcomes: A Meta-Analysis From Self-Determination Theory," *Perspectives on Psychological Science*
16(6), 1300–1323, DOI 10.1177/1745691620966789.** Retrieved via the Europe PMC REST API because
PubMed returns only a cookie notice. **Abstract only; full text not read.** Verbatim in part:

> *"we examine these different types of motivation in 344 samples (223,209 participants)…
> Ego-involved motives (introjected regulation) were positively related to persistence and
> performance goals but also positively related with indicators of ill-being. Motivation driven by a
> desire to obtain rewards or avoid punishment (external regulation) was not associated with
> performance or persistence but was associated with decreased well-being."*

The fetch reported "streak" and "gamification" **absent** from the record.

Three consequences:

1. The cited source does not say a loss-framed streak *fails*. It says ego-involved motivation
   **works for persistence and costs wellbeing**. That is a trade-off, not a refutation.
2. It hands D8 a **better** ground than the one in use: identified regulation (acting from personal
   value), which the abstract calls *"particularly highly related to persistence"*, is what a plain
   record of days practised sits closest to.
3. **Scope limit, stated so this is not over-read.** `ACT:388`'s stated reason has two halves —
   *"Controlled pressure conflicts with non-punitive stopping **and the training-product mission**."*
   The research half is misattributed. The **mission half is a product judgement that survives
   independently** and does not need Howard et al. to stand.

### A2. Khan Academy already ran this experiment as a product, twice

Removed daily streaks 2021-01-04 citing exactly the worry divergence 6 names; converted active
streaks into **permanent commemorative badges**; returned Aug 2024 with a **weekly, evidence-gated**
streak. Two forgiveness levers exist between "daily resettable" and "cannot fall": widen the window,
and gate on learning rather than on presence.

### A3. The one large education RCT that found no discouragement used a forgiving, gain-framed streak

Aulagnon et al., 60,000 students, Peru: *"We do not observe a discouragement effect from highlighting
streaks."* But the streak was **weekly**, and notifications *"always emphasized the benefits of
extending **or starting a new streak**."* Not evidence for a loss-framed daily streak; it **is**
evidence that a forgiving framing works.

---

## B. Answers to the five questions

### Q4 — cumulative vs consecutive: **no study runs both arms**

Searched five distinct query framings plus a domain-restricted sweep of arXiv, ACM DL, Springer,
ScienceDirect, Nature, PMC, Frontiers and Taylor & Francis. Nothing compares a never-falling counter
against a resettable streak on motivation or retention. Silverman & Barasch (2023, p. 50) state their
own studies are the first to examine logged-streak effects at all, which is consistent with the
comparison simply never having been run. **Two proxies exist; both are labelled as proxies in §D.**

### Q5 — does the motivational force depend on losability? **Contested, and not settled for loss aversion**

Duolingo asserts it in its own words: *"This is when we tap into 'loss aversion'."*

The only paper that **tested** the mechanism found otherwise. Silverman & Barasch Study 7 mediation:
sense of accomplishment indirect effect **.28 (SE .09, 95% CI [.13, .48])**; negative emotion
**−.08 (SE .06, 95% CI [−.21, .02])** — replicating Study 5. They leave loss aversion explicitly as
future work (p. 52).

Two broader results undercut loss aversion generally:
- **Gal & Rucker (2018)**, *J. Consumer Psychology* 28(3), 497–516, DOI 10.1002/jcpy.1047 — accepted
  PDF, pp. 1–2 read. Verbatim: *"current evidence does not support that losses, on balance, tend to
  be any more impactful than gains."*
- **Yechiam & Zeif (2025)**, *J. Economic Psychology* 107, 102801, DOI 10.1016/j.joep.2025.102801 —
  ⚠ **read via the RePEc/IDEAS listing reproducing the publisher's abstract, not the article.**
  84 papers, 163 estimates, n = 149,218: *"for studies with symmetric gains and losses and no
  ordering of items, the loss aversion parameter was approximately 1.07 and not significantly above
  1.0… This casts considerable doubts on the robustness of loss aversion."*

### Strongest evidence FOR the up-only design

Silverman & Barasch **Study 3**: displaying a **broken** streak left people **worse off than showing
no streak at all** — 45.21% vs 60.90% continuation, χ²(1) = 7.46, p = .006, OR = 0.53. The break is
not neutral; it is actively worse than never having had the mechanic.

### Strongest evidence AGAINST it

The same paper's **Study 5**: an **intact** streak did **not** significantly beat no-log — 82.55% vs
77.78%, χ²(1) = 1.05, **p = .31** — while broken-vs-no-log was marginal in the harm direction
(67.92%, **p = .055**). Authors concede at p. 52 that the intact-vs-no-log contrast *"was not
consistent across studies."*

**If the reliable half of a streak's effect is the punishment, an up-only counter keeps the half that
may be worth nothing.**

---

## C. What the apps actually implement

| App | Unit | Missed period | Protection | Cost |
|---|---|---|---|---|
| Duolingo | consecutive **days** | resets | Streak Freeze, equipped in advance | gems; free tier stores 2 |
| Brilliant | consecutive **days** | resets to 0 unless a charge is held | Streak Charge, auto-applied, max 2 | **free** — earned per lesson |
| Khan Academy | consecutive **weeks** | resets to 0 | none documented | n/a |
| Anki | **no streak** in shipped manual | n/a | n/a | n/a |
| Memrise | daily goal, per language pair | resets | restore only after a Memrise-side incident | free, incident-only |
| Elevate | consecutive **days** | resets to 0 unless frozen | Streak Freeze, max 2 | free at signup/milestones; **also sold for money or 150 coins** |

**Brilliant** — `brilliant.org/help/features/what-is-a-streak/` and `.../what-is-a-streak-charge/`,
both stating Last Updated 2026-08-10, opened 2026-08-17. Streak is *"the number of consecutive days
you've learned on Brilliant"*, maintained by completing *"either 3 problems or a full lesson in a
single day"*. Charges: *"Each time you complete a lesson or practice, you earn one Streak Charge."*;
*"You can hold a maximum of two Streak Charges at a time."*; *"If you miss a day and have a Streak
Charge, it will be automatically applied to preserve your streak."*; the charge *"does not count as a
day of activity, so your streak won't be extended—it'll stay where it is."* No monetary cost stated.
`[Product judgement]` — Brilliant's charge is earned by the learning itself and applied
automatically: the friendliest resettable design found, and the nearest neighbour to the up-only
proposal.

**Khan Academy** — HTML returns 403 to the fetcher; articles retrieved through the site's public Help
Center JSON API on the same host.
- Art. 28717667146893, updated 2026-08-11: *"A streak measures the amount of consecutive weeks you've
  achieved at least one proficient skill."*; *"The streak window runs from Monday at 12:00am to Sunday
  at 11:59pm (Pacific Time)."*; *"If you do not maintain the streak, the count goes back down to 0."*
- Art. 28805881827341, updated 2026-08-11: *"Your streak ended because you didn't get at least one
  skill to proficient in the prior week."* **Neither article mentions any freeze, charge, repair or
  grace mechanism** — absence established by reading the two articles that would carry it.
- Community post 360075847492, 2020-12-21, *"Update: Streaks are going away on January 4, 2021"*:
  *"When we looked at the Streak feature, we found that over 99% of learners did not use it regularly.
  It's also an older part of our site that's been difficult to keep running smoothly… Finally, we've
  heard from some learners and teachers that, as currently designed, streaks can actually be
  demotivating - especially when circumstances beyond one's control, like health or access to a device
  or Wi-Fi, can be the reason a streak gets broken."* Commemorative badges awarded at
  50/100/200/500/1000 days — a losable streak converted into a permanent award at the moment of removal.
- Art. 28946883989261, 2024-08-02, *"Introducing Streaks and Levels!"*, on behalf of Daniel De Angulo,
  Senior PM: *"Streaks are designed to promote and celebrate consistency, motivating learners to get at
  least one skill to Proficient or higher each week."* and *"we didn't just want any old streak, we
  wanted each added week to display meaningful learning."*

**Anki** — `docs.ankiweb.net/stats.html`, read 2026-08-17. Documents a **Calendar** graph and a
**Today** section; **the word "streak" does not appear.** A domain-restricted search surfaced
stats/getting-started/filtered-decks/deck-options/background/searching/preferences/leeches, none with
streak-tracking text. *Bounded: no streak documented on the statistics page and none surfaced in a
manual-wide search. Not every manual page was read; third-party add-ons out of scope.*

**Memrise** — Zendesk JSON API. Art. 360015973598, updated 2024-08-29: *"Complete your goal every day
to keep your learning Streak!"* and *"After each learning session, it is essential to connect your
device to the internet for it to record your points, otherwise the app will not recognise your
progress on that specific day, and you will lose your learning streak."* Art. 34666352079121, updated
2026-07-03: restoration only *"If an incident on Memrise has caused you to lose your streak"*.
*Memrise's own help text confirms the exact failure mode Khan cited — a break caused by something that
is not the learner.*

**Elevate** — Zendesk JSON API. Art. 4402925042715, updated 2024-08-26: *"A streak is the number of
consecutive days you've completed your daily workout or crossword puzzle."*; *"If you miss a day, your
streak resets to 0 unless you have a streak freeze available."* Art. 28507604797595, updated
2026-07-20: *"Each Elevate member will automatically receive two streak freezes once your account is
created!"*; *"You can continue to have a maximum of two streak freezes at a time."*; *"3. Purchasing a
streak freeze with money…"*; *"4. Purchasing a streak freeze with coins… purchase streak freezes with
150 coins!"* Milestones: *"3, 7, 14, 30, 50, 75, 100, 150, 200, 250, 300, 350, 365, 400, and then every
50 and 365 days after that."* *Elevate monetises the break directly; the up-only design forecloses that
revenue line — relevant to `LDB-05` §12 divergence 3's deferred free-tier bound.*

### Duolingo specifically

Six official blog posts opened. **The help centre could not be opened**:
`support.duolingo.com/hc/en-us/articles/204980880-What-is-a-streak` 301s to `duolingo.com/help`, which
renders client-side and returned only the word "Duolingo". **UNVERIFIABLE.**

- **Loh (2017-05-10).** *"Learners who were offered the Streak Wager came back to the app more
  frequently and completed more lessons… statistically significant increases in Day-1, Day-7 and
  Day-14 user retention, with Day-7 retention showing the greatest improvement at +14%."* Weekend
  Amulet: *"learners offered the Weekend Amulet were 4% more likely to come back a week later and 5%
  less likely to lose their streak."* And: *"While keeping a streak is great for motivation, losing a
  streak can be very discouraging."*
- **Yu (2020-11-19), "Improving the streak."** Separating daily goal from streak: *"a 3.3% increase in
  Day 14 retention"*, *"a 1% increase in our overall daily active learners"*, *"a 10.5% increase in the
  percentage of daily learners on a streak"* in 20 days, 19% for new users; a year later *"just over
  half of our daily learners have a streak at least 7 days long, compared to about a third… a year
  ago."*
- **Mansur (2022-01-31).** *"This is when we tap into 'loss aversion,' an internal bias in your brain
  that makes you particularly averse to losing something, like a learning streak."*; *"If you lose a
  day and break your streak, it can have the opposite effect, and actually feel quite* de*motivating."*;
  *"The Streak Freeze… is designed to grant this type of flexibility when you need a day off."*;
  *"Duolingo learners who reach a streak of just 7 days are 3.6 times more likely to complete their
  course."*; milestone animations *"increased the likelihood a brand new learner was still using
  Duolingo 7 days later by +1.7%"*. Second retrieval added: two equipped Streak Freezes increased DAU by
  **0.38%**; 2→3 days is a 50% increase vs 200→201 at 0.5%. ⚠ **Confidence flag:** extracted by the
  fetching tool from the live page; figures corroborated across two independent retrievals, exact
  wording not diffed against raw HTML.
- **Bunch, Hewitt & Nicol (2021-11-01), "How we protect learner streaks from site issues."** *"If a
  learner loses their streak because of something out of their control… then the learner may feel
  cheated out of their hard work."*; *"To date, BRB has protected over 2 million streaks."* *Duolingo
  built and staffed an incident system partly to prevent streak breaks — a direct measure of how
  expensive the break is to them.*
- **Duolingo Team (2024-08-05), "Friend Streak."** *"Nearly 8 million learners on Duolingo have a streak
  of 365 days or more."*; *"Learners with at least one shared streak are 22% more likely to complete
  their daily lesson."*
- **Zakryzhevskyy & Lesher (2023-04-18).** Freezes bought with gems; *"the free app allows you to store
  2 Freezes"* (⚠ fetcher truncated at 125 chars — partial quotation).

**Established:** Streak Freeze, Weekend Amulet, Streak Wager, with effect sizes.
**UNVERIFIABLE:** Streak Repair and Streak Society — no official page describing either was opened.
Third-party guides assert 200 gems / free with Super and a 7-day Society entry with 30/100/365 tiers;
**not opened, not cited.**
**No Duolingo publication reporting a wellbeing/anxiety study of the streak was found** — only the
three self-reported acknowledgements quoted above.

---

## D. Research detail

### D1. Streaks help — Aulagnon, Cristia, Cueto & Malamud (2026)

*"Streaks to Success? The Effects of Highlighting Streaks on Student Effort and Learning,"* Northwestern
IPR WP-26-05, version 2026-02-19 (also NBER WP 34173; published in *Economics of Education Review*, PII
S0272775725001013 — **ScienceDirect returned 403; the working paper was read, not the journal
version**). Cover page marked DRAFT, *"Please do not quote or distribute without permission"* — cited as
evidence, not republished. Pages 1–11 read.

Abstract verbatim: *"The authors examine whether highlighting streaks—instances of repeated and
consecutive behavior when completing learning tasks—encourages 4th to 6th grade students in Peru to
increase their use of an online math platform and improve learning. 60,000 students were randomly
assigned to receive messages that (i) highlighted streaks, (ii) provided personalized reminders with
positive reinforcement, (iii) provided generic reminders, or (iv) to a control group. Highlighting
streaks and providing personalized reminders significantly increased platform use compared to generic
reminders and the control group, with streaks more effective on the intensive margin and personalized
reminders more effective on the extensive margin. Highlighting streaks also significantly improved math
achievement compared to the control group among the 1,500 students who took an endline test, although
differences with other treatment arms were not significant."*

Six weeks, 17 Jan – 21 Feb 2022, platform *Conecta Ideas*, 30 exercises/week. Control baseline: *"only
5.3 percent of students in the control group used the platform at least once, and these students
connected for 31.7 percent of weeks."* Extensive margin personalized 3.8 pp vs streaks 2.8 pp; intensive
margin streaks 9.4 pp vs personalized 6.9 pp. **"We do not observe a discouragement effect from
highlighting streaks."** Learning: pooled 0.10–0.12 SD; streaks arm 0.13–0.17 SD over control — with the
authors' four caveats, including *"these effects are not significantly different from those of the other
treatment arms"*, *"participation in the endline tests was extremely low at only 2.3 percent"*, and
**differential attrition favouring the headline** (*"participation in the endline test was significantly
higher for students whose streaks were highlighted (by 0.7 percentage points)"*).

⚠ **Design detail that reframes the result:** weekly streak, and notifications *"always emphasized the
benefits of extending or starting a new streak."*

### D2. Broken streaks harm — Silverman, J., & Barasch, A. (2023)

*"On or Off Track: How (Broken) Streaks Affect Consumer Decisions,"* *Journal of Consumer Research*
49(6), from p. 1095, DOI 10.1093/jcr/ucac029. **Accepted manuscript read** (page numbers its own), pp.
1–6, 13–26, 33–36, 41–53. Funding, p. 2: *"Partial financial support for this research comes from the
Wharton School's Baker Retail Center and the Wharton Behavioral Lab."* No industry funding declared.
OSF `osf.io/kpjh9/`. Studies 4–7 preregistered; *"All experimental studies involved sample sizes between
400 and 600 participants."*

| Study | N | Result |
|---|---|---|
| Pilot | 100 MTurk | 59% *"had 'gone out of their way' to maintain (or avoid breaking) their streaks on an app"*; 27% offline; liking M = 5.10, SD = 1.86, t(99) = 5.91, p < .001, d = 0.59 |
| 1 (field, 980 employees, 30-day 7,000-step challenge, autumn 2018) | 980 | intact-vs-broken b = 0.38, SE = .03, Z = 11.27, p < .001; intact b = 0.25, SE = .05, Z = 5.06; **broken b = −1.01, SE = .07, Z = −14.94** |
| 2 | 601 | 66.23% vs 57.86%, χ²(1) = 4.47, p = .035, OR = 1.43 |
| 3 | 602 | streak main effect F(1,598) = 49.90, p < .001, OR = 3.17; interaction F(1,598) = 35.02, p < .001; **log-present intact 92.47% vs absent 64.94% (χ² = 33.47, p < .001, OR = 6.63); log-present broken 45.21% vs absent 60.90% (χ² = 7.46, p = .006, OR = 0.53)** |
| S2a / S2b | 156 / 218 | 69.95% vs 48.72% (p = .015, OR = 2.23) / 37.61% vs 64.22% (p < .001, OR = 0.34) |
| 5 (breadth of what counts) | 452 analysed (353 stopped pre-manipulation; attrition χ²(2) = 1.97, p = .37) | intact 82.55%, **no log 77.78%**, broken 67.92%; intact vs broken χ² = 8.78, p = .003, OR = 2.23; **intact vs no-log χ² = 1.05, p = .31**; broken vs no-log χ² = 3.69, **p = .055**, OR = 0.61 |
| 6 (attribution) | 418 | intact 53.17%, externally-attributed 42.00%, **self-attributed 28.87%**; intact vs self χ² = 16.39, p < .001, OR = 2.80; self vs external χ² = 5.48, p = .019, OR = 0.56 |
| 7 (repair) | 601 | intact 93.14%, broken 68.66%, **repairable broken 85.20%**; repairable vs broken χ² = 15.26, p < .001, OR = 2.63 |
| S3a / S3b (length) | 596 / 507 | replicated at all lengths; **no significant streak × length interaction (ps > .40)** |
| S4 (public vs private) | 604 | 55.78% vs 43.85%, p = .003, OR = 1.61; public × streak interaction n.s., F(1,600) = 0.14, p = .71 |

Authors' caution, p. 52: *"Studies 3, 4, and 5 found some evidence for the positive effect of an intact
logged streak and the negative effect of a broken logged streak, relative to the absence of a behavioral
log, but the statistical significance of these contrasts was not consistent across studies."*

Practical implications, p. 49 — **the only published statement located that speaks directly to the trade
divergence 6 makes**: *"They could also consider greater flexibility in the time periods that count
towards a streak (i.e., whether streaks are calculated at the daily or weekly level). Larger units of
time could allow irregular or inconsistent behavior to be portrayed as an intact streak within the
consumer's log, thus making it easier for them to maintain their goal progress. However, while defining
streak-contributing behaviors more broadly may keep less-motivated consumers engaged, it may also
decrease the value and meaning of maintaining a streak."* An author's caution, not a tested result.

**Inconvenient result, recorded because it cuts against the anxiety narrative** — footnote 2, p. 15:
*"Participants did not report feeling overwhelmed, bothered, or distracted by such information, or that
it took away from their experience in using the app (Ms < 2.60, ts > 7.75, ps < .001, ds > 0.75)."*

**Gaming the mechanic, measured.** Pilot p. 15: 27% engaged in offline behaviour to maintain a logged
streak; one participant *"didn't want to work out… but did a quick 7-minute workout in the back of a bar
to make sure [his] streak remained intact."* Study 6 p. 42: 45% willing to watch an advertisement to
maintain a logged streak, 43% to repair one (S3a: 51% / 46%).

### D3. A missed day is cheap — Lally, van Jaarsveld, Potts & Wardle (2010)

*European Journal of Social Psychology* 40(6), 998–1009, DOI 10.1002/ejsp.674. Open copy read, pp.
998–999, 1004–1006. Abstract in part: *"96 volunteers chose an eating, drinking or activity behaviour to
carry out daily in the same context… The time it took participants to reach 95% of their asymptote of
automaticity ranged from 18 to 254 days… Missing one opportunity to perform the behaviour did not
materially affect the habit formation process."* Results p. 1006: *"One hundred and forty such missed
opportunities were identified across 55 participants. Immediately following a missed opportunity,
automaticity decreased by an average of 0.29 points on the SRHI automaticity subscale; a very small
decrease… These results suggest that missing a day resulted in a non-significantly lower SRHI score, but
there were no long-term costs associated with a single omission."* Unrelated to timing of the omission
(r = 0.099, p = 0.246, N = 140). Median time to 95% asymptote among 39 good-fit participants = 66 days
(Q1:Q3 39:102).

`[Product judgement]` — the cleanest warrant for the design's instinct: a mechanic that punishes one
missed day punishes something the habit literature says does not matter. **It does not show that removing
the punishment preserves the motivation.**

### D4. Proxy 1 — the GitHub natural experiment

Moldon, Strohmaier & Wachs (2021), ICSE 2021, DOI 10.1109/ICSE43902.2021.00058; arXiv:2006.02371v3.
Abstract page and PDF pp. 1–3, 5–8 read. GitHub profiles showed **both** representations: a cumulative
contribution calendar with a running total, and two consecutive-day streak counters. In **May 2016**
(Fig. 1 caption: 19 May 2016) it removed **only the streak counters** and kept the calendar — p. 3:
*"As of 2020, developer profiles are still adorned with a contribution calendar."* A live, large-N
removal of the resettable half with the cumulative half left standing.

- p. 6: *"the average length of a streak exceeding 14 days declined from nearly 26 days in early 2016 to
  22 days in early 2017. At extreme lengths the change is even more drastic: among streaks of length at
  least 14, those started in early 2016 were more than twice as likely to exceed 100 days (4.4%) than
  those started in early 2017 (2.0%)."*
- Weekend share fell 0.2188 → 0.2179 (all), 0.2433 → 0.2399 (streak ≥ 20), 0.2487 → 0.2459 (≥ 30); RDD
  treated coefficient **β₂ = −0.0365, p < 0.001** at bandwidth 4 (144,726 obs), with placebo tests at
  other dates showing no comparable effect.
- p. 7: *"SCDs were more common before the change overall (36% of days vs 32%). At the end of long
  streaks before the design change, over 40% of days were SCD, compared with roughly 36% after the
  change. We interpret this as evidence that developers went out of their way to keep their long streaks
  alive."* (SCD = single contribution day — minimal-effort padding.)
- ⚠ **Absolute activity did not fall.** Table II shows total weekend contributions across *all*
  developers rising 45.3M → 48.6M, while falling for streaking subgroups (13.5M → 10.3M for ≥ 20; 9.5M →
  7.6M for ≥ 30). **Do not read this as platform-wide engagement loss.**
- **Most supportive of the up-only design**, p. 8: *"many developers stopped maintaining their streaks
  right after hitting the 100 day goal, not even reaching a length of 105 days. These results suggest
  that developers still streak because of the goal based challenge after the change, even without having
  a streak feature… This suggests that some developers did not need the counters to achieve their
  goals."*

`[Product judgement]` — a **removal** study, not a **substitution** study. GitHub never built a
deliberate up-only counter; the calendar was already there and unchanged. Best available proxy; label it
a proxy.

### D5. Proxy 2 — Silverman & Barasch Study 5

A partial test of "make the counter harder to break": actual behaviour identical, only the breadth of
what counted varied. Broad won (82.55% vs 67.92%) but did **not** significantly beat no-log (77.78%,
p = .31). Applied to divergence 6, this predicts an up-only counter lands nearer the no-log baseline than
the intact-streak number — `[Product judgement]`, the study does not license the extrapolation.

### D6. Adjacent, not opened

Nunes & Drèze (2006), *"The Endowed Progress Effect,"* *JCR* 32(4), 504–512 — SSRN returned 403, Oxford
Academic not retrieved. **Not opened; its car-wash numbers are not cited.** Also a poor fit: endowed
progress concerns a *finite* reward, while a lifetime day counter has no terminus. Silverman & Barasch
(pp. 47–48) call the streak case a *maintenance* goal — *"a goal that is defined by an ongoing process
without a clear end state (since streaks can only be maintained, not 'completed')"*. **An un-losable
counter arguably creates no maintenance goal at all.**

---

## E. What could not be established — enumerated positively

1. **Direct cumulative-vs-consecutive comparison.** Searched: `"unbreakable streak" OR "non-resetting
   streak" OR "streak that cannot be lost" motivation experiment research`; `experiment comparing
   "cumulative" total-days counter versus "consecutive" streak motivation gamification`; `gain-framed
   versus loss-framed progress feedback goal pursuit experiment "loss frame" streak persistence`; plus a
   domain-restricted sweep of arxiv.org, dl.acm.org, link.springer.com, sciencedirect.com, nature.com,
   pmc.ncbi.nlm.nih.gov, frontiersin.org, tandfonline.com for `"streak" mobile learning app peer-reviewed
   study negative effects dropout "loss aversion" gamification dark side empirical`. **Nothing runs both
   arms.**
2. **Duolingo Streak Repair / Streak Society from an official source.** Three domain-restricted searches
   of blog.duolingo.com and duolingo.com; ten distinct URLs returned, six opened; none describes either.
   Help centre renders client-side. **UNVERIFIABLE.**
3. **Any Duolingo wellbeing/anxiety study of the streak.** Two searches; only the three self-reported
   acknowledgements found. Anxiety material that surfaced was non-peer-reviewed commentary (Medium, UX
   Magazine, duolingoguides, screenwiseapp), not opened and not cited.
4. **Khan freeze/grace mechanics** — absence established by reading the two articles that would carry it.
5. **Anki streak** — bounded to the statistics page plus a manual-wide search.
6. **Nunes & Drèze (2006)** — 403; not opened; not cited beyond its existence.
7. **Cochran & Tesser (1996), the "what-the-hell effect"** — the canonical citation for post-violation
   abandonment, cited by both papers above. **Not opened.** Everything sayable is relayed via Silverman &
   Barasch p. 43: *"a repair opportunity should enable them to resume goal pursuit and reduce feelings of
   goal failure (e.g., Cochran and Tesser 1996)."*
8. **Sepúlveda, Varas-Pavez & Peake (2026), *Education and Information Technologies*, DOI
   10.1007/s10639-026-13920-6** — Springer redirected to an auth endpoint; metadata confirmed via
   CrossRef, which holds **no abstract**. Not read; lead only.
9. **Howard et al. (2021) full text** — abstract and metadata only; per-outcome effect sizes, moderators
   and funding statement not read.
10. **The journal version of the Peru RCT** — ScienceDirect 403; the Feb 2026 IPR working paper was read
    and the two may differ.
11. **Verbatim fidelity of Duolingo blog quotations** — read through the fetching tool, not raw HTML.

---

## F. Leads recorded, not chased

| Lead | Why it matters | Why not chased |
|---|---|---|
| **Hamari (2017), "Do badges increase user activity?", *Computers in Human Behavior* 71, 469–478** (2-year field experiment, pre N = 1,410 / post N = 1,579) | Badges are cumulative and un-losable — the closest analogue to "does a never-falling award motivate" | Not opened. **Highest-value single follow-up** |
| Nunes & Drèze (2006), endowed progress | Up-only progress and persistence | 403; finite-goal fit is poor |
| Yang, Stamatogiannakis & Chattopadhyay (2015) maintenance goals; Wallace & Etkin (2018) "do your best" goals | The right literature for whether an un-losable record functions as a goal at all | Outside the five questions |
| Kivetz, Urminsky & Zheng (2006); Gao et al. (2014); Hsee et al. (2003) | Cited by Silverman & Barasch p. 48 as the "continue after several past instances" literature | Adjacent; none contrasts cumulative with consecutive |
| Sepúlveda et al. (2026) kindergarten numeracy streak study | Second education-domain streak result | Paywalled, no abstract |
| Milkman et al. megastudy work on returning after a missed workout | Designing for the lapse rather than punishing it | Outside the named questions |
| Duolingo investor materials | May quantify the streak's role in DAU retention | Not searched |

---

## G. The agent's own confidence flags, in its stated verifier priority order

1. Exact wording of the Duolingo 2022 blog quotations — figures corroborated across two retrievals,
   wording not diffed.
2. The inference in §A1 that Howard et al.'s introjected-regulation result implies "works and costs
   wellbeing" — drawn from the **abstract**, full text unread.
3. The §D5 extrapolation that an up-only counter lands near the no-log baseline — `[Product judgement]`,
   unlicensed by the study.
4. The Brilliant *"Last Updated: August 10, 2026"* dates, reported by the fetcher.
5. Anki's total absence of a streak, bounded as stated.

**Sources the agent reports opening: 18.** Duolingo blog ×6; Brilliant help ×2; Khan Academy
help/community ×4; Memrise help ×2; Elevate help ×2; Anki manual ×1; Silverman & Barasch 2023 (30 pages);
Moldon et al. 2021 (7 pages); Aulagnon et al. 2026 (11 pages); Lally et al. 2010 (5 pages); Gal & Rucker
2018 (2 pages); Yechiam & Zeif 2025 (**abstract via RePEc only**); Howard et al. 2021 (**abstract via
Europe PMC only**); plus the in-repository `ACT` document at `:388` and `:45`.
