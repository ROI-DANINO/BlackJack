# Integrity Manifest — POST-remediation

> Companion to `INTEGRITY-MANIFEST-pre.md`. Taken after all Phase 1 remediation passes completed,
> before the gate-summary rewrite. Algorithm: `sha256sum`.
> Rule: **every hash that differs from the pre-manifest must be explained by a named, authorised
> remediation. Any unexplained delta is a tamper signal.**

## A. Repository integrity — agents

Seven probes captured immediately before the first remediation dispatch and re-checked after the last.

| Probe | Pre | Post | Verdict |
|---|---|---|---|
| `git rev-parse HEAD` | `c9daf56…` | `c9daf56…` | ✅ identical |
| `git show-ref` | `5ec5c15e…` | `5ec5c15e…` | ✅ identical |
| `git status --porcelain` | `872070c3…` | `872070c3…` | ✅ identical |
| `git ls-files -s` (index) | `a3f9fd2c…` | `a3f9fd2c…` | ✅ identical |
| product source (`src crates tools scripts docs`) | `1849c3ed…` | `9b5decf7…` | ⚠️ **changed — explained below** |
| `git reflog` depth | 270 | 270 | ✅ identical |

**The single delta is fully attributed and is not an agent action.** `git status --porcelain` reports
exactly one modified tracked file:

```
 M docs/superpowers/specs/2026-07-17-adaptive-learning-foundation-audit-research.md
?? .claude/
```

That is **the orchestrator's own charter edit** — amendments 5–7, the two factual corrections, and the
later Elo/IRT narrowing (100 insertions, 9 deletions vs HEAD), made under explicit user authorisation.
`.claude/` is the new restricted agent-type directory, also orchestrator-created. **No agent modified
product code, specs, plans, or the charter**, and `git diff --stat` over `src/ crates/ tools/ scripts/`
shows no other file touched.

**Result: 0 of 12 agents ran git in any form.** All twelve self-disclosed their shell use
(`ls`, `grep`, `wc`, `tail`, `curl`, `pdftotext`); every disclosure is corroborated by the probes.
Phase 1's comparable rate was 2 of 4 agents violating a bolded prohibition.

### Two honest limits of this instrument
1. **The `git status --porcelain` probe cannot detect *further* modification of an already-modified
   file.** The charter was already unstaged-modified at baseline, so the second edit left the porcelain
   output byte-identical. The content hash caught what the status hash could not — which is why both
   probes exist. A future run should hash tracked-file *contents*, not just status output.
2. Hash equality proves the tree is unchanged; it does not prove nothing was *read*. Read-only
   exfiltration is out of scope for this instrument.

## B. Inbox artifacts — pre vs post

**Unchanged (verification records are immutable by design; templates untouched):**

| File | sha256 | State |
|---|---|---|
| `_templates/dossier-template.md` | `827800e3…` | ✅ unchanged |
| `_templates/evidence-quality-rubric.md` | `f26df857…` | ✅ unchanged |
| `_templates/verification-record-template.md` | `5941127f…` | ✅ unchanged |
| `verification/V1-knowledge-tracing.md` | `5aa1204a…` | ✅ unchanged |
| `verification/V1b-knowledge-tracing-sufficiency.md` | `055c3949…` | ✅ unchanged |
| `verification/V1c-knowledge-tracing-toppedup.md` | `0a37fa3e…` | ✅ unchanged |
| `verification/V2-its-actr-procedural.md` | `0042519c…` | ✅ unchanged |
| `verification/V2b-its-actr-procedural-toppedup.md` | `fe1e9cc3…` | ✅ unchanged |
| `verification/V3-deliberate-practice.md` | `95581d02…` | ✅ unchanged |
| `verification/V3b-deliberate-practice-toppedup.md` | `32a9972c…` | ✅ unchanged |
| `verification/V4-chesscom-khan.md` | `a21ffa29…` | ✅ unchanged |
| `verification/V4b-chesscom-khan-toppedup.md` | `a020ac3f…` | ✅ unchanged |
| `verification/V5-anki-spaced-repetition.md` | `faf8c5d4…` | ✅ unchanged |
| `verification/V5b-anki-spaced-repetition-toppedup.md` | `95c8eadc…` | ✅ unchanged |
| `verification/V6-blackjack-teachable.md` | `8f8c2ba6…` | ✅ unchanged |
| `verification/V6b-blackjack-teachable-toppedup.md` | `34307c8f…` | ✅ unchanged |
| `registers/conflict-register.md` | `0c4a9c17…` | ✅ unchanged — reconciliation pending |
| `registers/source-lead-register.md` | `2b149138…` | ✅ unchanged — reconciliation pending |
| `P1-gate-summary.md` | `5b073b0d…` | ✅ unchanged — rewrite pending |

**Changed — each with its authorising pass:**

| Dossier | Pre | Post | Authorised by |
|---|---|---|---|
| `C1-knowledge-tracing` | `bf8e24e7…` | `cebeccd2…` | C1-R2 collection (amdt 5+6) · C1-EC repair (V1d) · C1-W Wauters (amdt 6) |
| `C2-its-actr-procedural` | `a7f05ea2…` | `f274acb7…` | C2-EC editorial (amdt 7) · C2-EC2 (V2c R1–R4) |
| `C3-deliberate-practice` | `189b4e2f…` | `567d53bb…` | C3-EC editorial (amdt 7) · C3-EC2 (V3c C-1–C-5) |
| `C4-chesscom-khan` | `81a2ed45…` | `0af0cf09…` | C4-RT collection (amdt 6) · C4-ED editorial landing |
| `C5-anki-spaced-repetition` | `0ca3b5a1…` | `6e28e51f…` | C5-REM collection (amdt 5) |
| `C6-blackjack-teachable` | `435fd41f…` | `25bebf44…` | C6-EC landing pass (amdt 7) — **see note** |

*C6 note: the pre-remediation C6 dossier was byte-identical to the snapshot at the time the §4 audit
ran, confirming it was untouched by the first remediation wave, as instructed. Its hash changed only
when the later landing pass applied V6/V6b's already-recorded corrections. The user's C6 instruction
barred additional **collection**; the landing pass performed none — zero WebFetch calls, zero new
sources. This is flagged for the user's ruling at the gate.*

**New files (18):** `INTEGRITY-MANIFEST-pre.md`, this manifest, five remediation collection reports,
six remediation editorial reports, and five new verification records (`V1d`, `V2c`, `V3c`, `V4c`,
`V5c`). All hashes recorded in the run ledger.

## C. Change ledger — what changed and why

| Card | Passes | Remedy type | Net effect |
|---|---|---|---|
| C1 | C1-R2, C1-EC, C1-W | collection ×2 + editorial | +6 findings, +2 citations; **overstated "falsified" claim reversed**; F22 counterweight added; F24 spliced quote struck + COI recorded; lab-independence disclosure added; **r=0.80 zero-response figure obtained** |
| C2 | C2-EC, C2-EC2 | editorial ×2 | **0 new citations**; 13 corrections landed that had never reached the dossier; report-type moderator extracted **then correctly qualified** as non-replicating under adjustment |
| C3 | C3-EC, C3-EC2 | editorial ×2 | 0 new citations; corrigendum figures landed and marked; **manufactured defect struck**; register ID corruption prevented |
| C4 | C4-RT, C4-ED | collection + editorial | +1 citation (**null result**); 5 recorded-but-unapplied corrections landed; counts reconciled to 13/15 — **at hard cap** |
| C5 | C5-REM | collection | +4 citations; **fabricated venue rejected in flight**; gap RECONFIRMED not closed |
| C6 | C6-EC | editorial | 0 new citations; V6+V6b corrections landed; F2 re-bucketed Evidence-backed → **Assumption** |

**Total: 12 remediation passes — 5 collection, 7 editorial — plus 5 independent verifications and
1 program-integrity audit.**
