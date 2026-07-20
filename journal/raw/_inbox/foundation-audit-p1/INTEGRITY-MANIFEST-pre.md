# Integrity Manifest — PRE-remediation

> Tamper-evident baseline taken **before** any Phase 1 remediation edit.
> Required by the user's remediation brief (2026-07-20) because the inbox is git-ignored and
> therefore has no version-control integrity guarantee of its own.
> Algorithm: `sha256sum`. Scope: every `.md` under `journal/raw/_inbox/foundation-audit-p1/`.
> Taken by the orchestrating session, before dispatching any remediation agent.

Baseline commit of the tracked repo at capture time: `c9daf56` (branch `gate/p1-summary`).
Files below are **untracked** — these hashes are their only integrity record.

## Dossiers (6)

| File | sha256 |
|---|---|
| `C1-knowledge-tracing/dossier.md` | `bf8e24e71d380ccbc19b0bcdc74c7e12044fdbf10ce8fa21a6cf8753de443274` |
| `C2-its-actr-procedural/dossier.md` | `a7f05ea28d697fc9ed2d1a284b6e60c05ca47e4a1e23af268642796902dbe6e1` |
| `C3-deliberate-practice/dossier.md` | `189b4e2fcc1988269e08dcd2cc5416ed8ef695336ba796ef25c54ae8eb7572c1` |
| `C4-chesscom-khan/dossier.md` | `81a2ed45eda5638fb7bb07ce6b3f0af4cf8191a479ad1fc68e08a2d41259ebcd` |
| `C5-anki-spaced-repetition/dossier.md` | `0ca3b5a1326ca27b80f557822447ef9d31a7a19d2e615ffcd8d00f9ce0574f47` |
| `C6-blackjack-teachable/dossier.md` | `435fd41f485fdb2a890f54af9d899b2e062ca808e062a83520a2ab43741d6b6b` |

## Gate summary (1)

| File | sha256 |
|---|---|
| `P1-gate-summary.md` | `5b073b0d78d4e7a7234d56cceb823755c8888f67408c8765f039e7ac386737dc` |

## Registers (2)

| File | sha256 |
|---|---|
| `registers/conflict-register.md` | `0c4a9c17e23fa4481ad1eaaf27d13c9075082d066df0880e4fe51e0737dfae57` |
| `registers/source-lead-register.md` | `2b149138d1a008f670f3225b9753509812cbdaa39edc17e3466d1aa0839eedd8` |

## Verification records (13)

| File | sha256 |
|---|---|
| `verification/V1-knowledge-tracing.md` | `5aa1204a36dbca8e2e8ff2d3cd8e0f2f01f6a2489121c093bae35556437310f7` |
| `verification/V1b-knowledge-tracing-sufficiency.md` | `055c3949144378bf9752b48f30b34e14dffc17232ad65691a15ea467dd48abc0` |
| `verification/V1c-knowledge-tracing-toppedup.md` | `0a37fa3ec01a14d928bacb60b95f9065454c5cd372efb52a3450761f556b146f` |
| `verification/V2-its-actr-procedural.md` | `0042519c44bd48dda4b7ec831a77ed721215bcbdd72e0300230e7e6f0d383752` |
| `verification/V2b-its-actr-procedural-toppedup.md` | `fe1e9cc39a7d57d1ef345d43daf66f198e719f9c90850fa18dc91890db9b76da` |
| `verification/V3-deliberate-practice.md` | `95581d027aed9d8f13a74474379ea3a2218e36d4e7622eb0ddca4abd4529e50b` |
| `verification/V3b-deliberate-practice-toppedup.md` | `32a9972c9afe266893fc3d98e44ca0288c05e693c28798694f8f1132125f1ff3` |
| `verification/V4-chesscom-khan.md` | `a21ffa29fa4629d9e9c7563a2cd8631462bcb0e3e6a2c0d9eb17a166fdade394` |
| `verification/V4b-chesscom-khan-toppedup.md` | `a020ac3f1d4c59eeed5cd5075caeea4dfb42d7cb7636a7365c8a3430b7bf568c` |
| `verification/V5-anki-spaced-repetition.md` | `faf8c5d49982cc2aadafbe446f5bbd8f814b9b0248aa1a52d76986d567618bba` |
| `verification/V5b-anki-spaced-repetition-toppedup.md` | `95c8eadc99337647276aada9514814d87eb933223e3d454985d0fda36f2245df` |
| `verification/V6-blackjack-teachable.md` | `8f8c2ba654b0abe3dda2c96c7f2d134fab2c2c8107add3641ed43a27a8583023` |
| `verification/V6b-blackjack-teachable-toppedup.md` | `34307c8fb65ae48594a3d63c04cfc20916c40ebc6315c4d145b364dc6cd8f5f2` |

## Templates (3, expected unchanged by remediation)

| File | sha256 |
|---|---|
| `_templates/dossier-template.md` | `827800e38e57c0022b3b4d897c0ad40d392d97555c5cb47694d512ef2d7f9c2c` |
| `_templates/evidence-quality-rubric.md` | `f26df85767f72b4fa82328d8c0f54695521ed5f6ba0e7f39f36753a7b2f98aab` |
| `_templates/verification-record-template.md` | `5941127fcab30cb7a8c34743310ec78c21429fbdd2565e4b89c8bd52dd383383` |

---

**Total: 25 files.** A POST-remediation manifest will be taken at the completion gate; every
hash that differs must be explained by a named, authorised remediation in the change ledger.
Any hash that differs *without* such an explanation is a tamper signal.
