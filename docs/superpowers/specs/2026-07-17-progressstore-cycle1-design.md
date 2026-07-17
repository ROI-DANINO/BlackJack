# ProgressStore — Cycle-1 Foundation Design

> Status: **approved 2026-07-17**. Authoritative for the cycle-1 `ProgressStore` foundation.
> `journal/decisions.md` (2026-07-17) carries the approving decisions — the AL-D1 cycle-1 scope row,
> the learner-identity row, the conditional `idb` admission row, and the
> "Approve the cycle-1 ProgressStore design" row that records the four rulings folded in below.
>
> Scope: the provider-neutral `ProgressStore` port, the versioned learner envelope and attempt
> record, and a provider-neutral contract suite proven **headless against fixtures**.
> **No UI consumer. No learner data written. No `LessonController` changes.**
>
> Source: `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md`.
> Admission evidence and downstream constraints: `docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md` (AL-R2).
> Implementation plan: `docs/superpowers/plans/2026-07-17-progressstore-cycle1.md`.
>
> Legend: **[PINNED]** = fixed by an approved doc, cited. **[DEVIATION]** = an approved departure from
> an approved doc's letter, justified inline and registered in §12.

---

## 1. Findings that frame this design

Three facts about the real tree, established before any design work:

**F1 — `outcomeId` is already a validated skill foreign key.** `validate.ts:51-55` validates
`unit.outcomes[]` against `subject.skills[].id`; `validate.ts:70-75` validates `step.outcomeId`
against `unit.outcomes`. The chain `step.outcomeId → unit.outcomes[] → Subject.skills[].id` is
enforced today, and `blackjack-basics.ts:13-30` confirms it. **The skill key exists and is misnamed** —
and the name collides with blackjack's own `outcomes`, since `AttemptEngineContext.outcomes:
HandOutcome[]` (win/loss/push) sits in the *same record* as `outcomeId` (a skill). The durable
projection renames it `skillId`.

This does not rescue the current record. Skill granularity (`'hand-total'`) is coarser than the
per-cell keying mastery needs — `learning-mastery-and-scoring.md:56-66` requires classification and
row/column navigation to be measurable separately from choosing the action. The 2026-07-17 re-scope
stands. The fix is **rename + refine**, not invent.

**F2 — AL-R2's four proven stores are reconstructible.** The report never names them, but
`CheckpointWrite{idempotencyKey, expectedRevision, attempts, sessionSummary}` (AL-R2 `:111-116`), the
`ResearchEnvelope` (`:100-109`), and the migration prose ("cursor transforms attempts before metadata
completes"; "the pre-existing `migration-existing` idempotency key", `:211-222`) force exactly:
`meta` · `attempts` · `sessions` · `idempotency`. §5.1 deviates from this deliberately.

**F3 — the lesson stack is synchronous, and that is not this design's problem.** `transport.ts:2` is
`call(commandJson: string): string`; every `LessonController` method returns `void`. This design makes
no controller changes (scope). §9 states the one constraint it will not violate: the port must be
adoptable by an async caller *without ever handing control back mid-transaction*.

---

## 2. The four approved decisions

Recorded in `journal/decisions.md` (2026-07-17). They are decisions, not open questions.

### 2.1 The `idb` bundle-delta threshold: **> 5 KB gzipped ⇒ material ⇒ revert to native IndexedDB**

The admission is **conditional** (`journal/decisions.md`, idb row): the implementation slice must
measure the real production bundle delta, and a material unacceptable delta reverses the choice.

**Method:** production build, gzipped bytes, with vs. without the `idb` import. AL-R2 `:326-327`
explicitly notes registry bytes are *not* the emitted bundle cost.

**Rationale:** this is an **alarm with roughly 3× headroom, not a budget.** It is not a byte target to
optimise toward; it fires only if `idb` turns out not to be the thin wrapper we admitted it as.
`idb`'s entire admitted value is removing lifecycle/request plumbing (AL-R2 `:297`, `:334-337`) — if it
costs more than a few KB, the reason to have it has evaporated and native IndexedDB wins.

**What makes reversal survivable** is a property of §3, not of luck: `idb` is imported by exactly one
file, the port is provider-neutral, and the contract suite is provider-neutral. A native adapter is a
new file passing the same 14 gates. Nothing else changes.

### 2.2 The cell key: cycle 1 fixes the field; curriculum owns the grammar

`evidence.cellId: string | null` is **opaque to the store**. The store does not define its grammar.

- A structured cell (`{handClass, playerTotal, dealerUpcard}`) would encode **strategy-table structure
  into the storage schema** — which `architecture.md:12-21` gives to the engine and the catalog, not
  to a persistence port.
- Parsing a stable catalog-assigned id into structure later is a **derivation, not a re-keying** —
  *provided* the ids are stable and injective.

**`cellId: null` is not an exception to the phantom rule of §7 — it satisfies it.** `null` here is a
**true value for a Foundations attempt**: the skill `'goal'` ("explain the goal of blackjack")
genuinely has no cell decomposition. It is not a placeholder standing in for a producer that does not
exist. A later reader must not mistake this for a carve-out.

**The obligation this creates is a cycle-2/3 gate, not cycle-1 work** (§13.2): the catalog must assign
stable, injective cell ids **before the first real write**. An unstable cell id reproduces the
`stepId` failure one level down, and §8 forbids the re-key that would fix it.

### 2.3 Authored prose is dropped from durable storage; ids and replay identity are kept

`prompt` and `feedback` currently store curriculum prose verbatim (`controller.ts:215-219`,
`:291-299`). The durable projection stores neither. Reasons, in force order:

1. **ALR-021 says wording is explicitly not evidence identity**: "learner-facing wording may vary
   within validated slots, but grading and evidence identity cannot."
2. **It would put model output into durable storage.** The design lets AI reword bounded slots
   (`:365`). Persisting a rendered prompt persists AI text, against `:444` — "Raw coach conversations
   are not retained unless later evidence establishes a requirement." The
   `presentation: 'canonical'|'ai'|'cache'|'fallback'` field records *that* wording was personalised
   without recording the wording, satisfying the pin at `:272` exactly.
3. **It duplicates authority.** ALR-002/ALR-008 make the versioned curriculum the authority for
   prompts and choices. A copy in progress storage is a second, un-versioned, drifting one.
4. **It is recomputable.** ALR-021: identical factory/catalog/engine versions + seed + params yield
   equivalent activity truth. `activity{activityId, activityVersion, catalogVersion, seed, params}`
   *is* the prompt, compressed.
5. It couples the progress schema to copy edits and grows storage without bound (§10).

The rule this yields, which governs every field in §4: **store what the reducer needs and cannot
recompute; drop what replay identity regenerates.** The reducer must never have to resolve an old
catalog to do its job.

**Known limitation — approved, and it must not be discovered later.** An export may resolve copy at
export time from the **current** catalog (§5.3). But attempts carry `catalogVersion`, and old catalogs
live in **git, not at runtime** — a build ships exactly one catalog version. So a learner who answered
under catalog v1 and exports under v2 sees **v2's wording against a v1 answer**. A resolved export is
therefore **approximately, not verbatim, faithful.**

> **An export is a data export. It must never be described — in UI copy, docs, or code — as a
> "transcript".** That word claims a verbatim fidelity this design does not provide.

### 2.4 `appendAttempt` drops `expectedRevision` — an explicit approved deviation

**This is a deliberate, recorded deviation from AL-R2's revision-conflict floor. It must never be
presented as a silent design choice.** Full mechanism in §8.4; the approved reasoning:

> **Two approved pins conflict.** AL-R2 `:128-131` forbids weakening revision-conflict behavior. The
> higher pin — raw attempts are the **sole durable truth** (`journal/decisions.md` idb row;
> `learning-mastery-and-scoring.md:107`; ALR-033) — forbids destroying evidence. A second tab's append
> is **genuine evidence**. Rejecting it on a revision conflict would destroy real evidence in order to
> satisfy the lower pin.
>
> **Appends commute; derived-state publishes do not.** `commitCheckpoint` needed a revision check
> because it *replaced* derived state — a lost update corrupts `cachedMastery`. Two tabs appending
> different attempts do not conflict semantically. A conflict check on an append protects nothing; it
> deletes something.
>
> **The floor protects the mechanism, and splitting is licensed** at AL-R2 `:128-131` ("may split or
> rename operations"). Once `commitCheckpoint` splits, the check belongs on the half that replaces
> derived state — `commitSessionSummary`. The mechanism is preserved where it means something.

The supporting claim was checked and holds: IndexedDB serialises `readwrite` transactions with
overlapping scope across connections in the same origin, so a read-modify-write of `meta.revision`
inside one transaction is atomic across tabs. This is the *same* serialisation that produced AL-R2's
"exactly one initial winner" (`:165`) — it yields a sequence rather than a conflict once the write is
an append rather than a conditional replace. Gate 7 (§11) re-proves it against this contract.

---

## 3. The port

### 3.1 Module boundary

New module `web/src/progress/`. The durable attempt is a **different type** from `learn/types.ts:45`'s
in-memory `AttemptRecord`, and `web/src/progress/` **must not import `web/src/learn/`**. If the durable
schema imports the lesson controller's shape, progress storage is coupled to lesson-authoring churn and
`architecture.md:84-88` ("Persistence … must sit behind application ports") is boundary theatre.

It *does* import `web/src/bridge/types` (`Action`, `HandOutcome`, `Ruleset`, `StrategyProfileId`) —
engine facts are engine-owned and must not be redefined, exactly as `learn/types.ts:4` already does.

| File | Responsibility | May import `idb`? |
|---|---|---|
| `progress/types.ts` | envelope, attempt, session, typed errors | no |
| `progress/store.ts` | the port | no |
| `progress/canonical.ts` | canonical serializer (§5.2) | no |
| `progress/fake-store.ts` | in-memory implementation for the suite | no |
| `progress/idb-store.ts` | **the only file that imports `idb`** | **yes** |
| `progress/contract.ts` | provider-neutral gate suite (§11) | no |

The single-import rule is what makes §2.1's reversal survivable, and it is **enforced by a test**, not
by convention (§11).

The cycle-3 mapper `LessonController.AttemptRecord → ProgressAttempt` is the missing producer. That it
does not exist is *why* cycle 1 writes nothing — the scope decision and the module boundary are the
same fact seen twice.

### 3.2 Six operations; `open`/`close` are lifetime, not semantics

**[PINNED]** the operation set (design `:171-172`): "load, append attempt, commit session summary,
export, reset, and explicit migration/recovery behavior." This spec fixes the signatures.

AL-R2's research contract (`:118-125`) had `open`/`close` and folded attempts + summary into one
`commitCheckpoint`. AL-R2 `:128-131` permits splitting/renaming but not weakening.

- **`commitCheckpoint` splits into `appendAttempt` + `commitSessionSummary`.** Required, not optional:
  design `:313-316` pins grade → persist the attempt → re-run the reducer **per response**, and `:524`
  pins "Attempts commit individually so stopping, closing, or refreshing does not make the whole
  session one fragile transaction." A batched checkpoint write satisfies neither.
- **`open` becomes a factory; `close` becomes disposal.** Neither is a semantic operation. A factory
  makes "call `load()` before `open()`" unrepresentable and gives the `versionchange` handler an owner
  (§8.4).
- **The sixth slot becomes `diagnose()`** (§3.5).

```ts
// web/src/progress/store.ts — imports NOTHING from web/src/learn/ and NOTHING from `idb`.

export type LearnerKey = string & { readonly __learnerKey: unique symbol };

export type ProgressStoreConfig = {
  namespace: string;                 // one IndexedDB database
  schemaVersion: number;             // the schema THIS app build understands
  mintLearnerKey: () => LearnerKey;  // injected: opaque, SYNC, format-agnostic (§6)
};

export type OpenOutcome =
  | { status: 'open'; store: ProgressStore }
  | { status: 'unavailable'; error: StorageUnavailableError };

export declare function openProgressStore(config: ProgressStoreConfig): Promise<OpenOutcome>;

export interface ProgressStore {
  load(): Promise<LoadOutcome>;
  appendAttempt(draft: ProgressAttemptDraft): Promise<AppendOutcome>;
  commitSessionSummary(write: SessionSummaryWrite): Promise<CommitOutcome>;
  exportSnapshot(request: ExportRequest): Promise<ExportOutcome>;
  reset(confirmation: ResetConfirmation): Promise<ResetOutcome>;
  diagnose(): Promise<Diagnosis>;

  /** Resource disposal, not a semantic operation. Idempotent. */
  close(): Promise<void>;
}
```

### 3.3 Typed recoverable errors — returned, not thrown

**[PINNED]** `RECOVERY_REQUIRED` and `NEWER_SCHEMA`, each carrying `{namespace, detectedSchema,
safeActions[]}`; **no automatic reset, ever** (AL-R2 `:226-230`; design `:526`).

They are **returned in discriminated unions, not thrown.** TypeScript has no checked exceptions, so a
thrown typed error is a typed error the compiler lets you ignore. A result union makes discrimination
mandatory at the type level. This is strictly stronger than AL-R2's gate and therefore does not weaken
"typed recoverable-error behavior."

Throwing is reserved for **bugs, not states**: using a closed store, or a draft that fails structural
validation. Those are not recoverable and must not be caught.

```ts
export type SafeAction =
  | 'export-raw'                  // AL-R2 :226-230
  | 'reset-with-confirmation'     // AL-R2 :226-230
  | 'upgrade-app'                 // AL-R2 :226-230
  | 'retry'
  | 'reload';

type StoreErrorBase = {
  namespace: string;
  detectedSchema: number | null | 'unreadable';
  safeActions: SafeAction[];
};

export type RecoveryRequiredError     = StoreErrorBase & { code: 'RECOVERY_REQUIRED'; invalid: InvalidRecordRef[] };
export type NewerSchemaError          = StoreErrorBase & { code: 'NEWER_SCHEMA'; detectedSchema: number; expectedSchema: number };
// --- below: originated by this design (§8). Nobody owned storage failure; ALR-023's fallback is AI/network-scoped.
export type StorageUnavailableError   = StoreErrorBase & { code: 'STORAGE_UNAVAILABLE'; reason: 'denied' | 'absent' | 'private-mode' | 'unknown' };
export type QuotaExceededError        = StoreErrorBase & { code: 'QUOTA_EXCEEDED' };
export type ConnectionSupersededError = StoreErrorBase & { code: 'CONNECTION_SUPERSEDED' };  // another tab is upgrading

export type InvalidRecordRef = { store: string; key: unknown; reason: string };
```

### 3.4 The five data operations

```ts
export type LoadOutcome =
  | { status: 'empty' }                       // fresh namespace. Mints NOTHING. load() is a pure read (§6).
  | { status: 'loaded'; envelope: LearnerEnvelope; migrated: { from: number; to: number } | null }
  | { status: 'recovery-required'; error: RecoveryRequiredError }
  | { status: 'newer-schema'; error: NewerSchemaError }
  | { status: 'unavailable'; error: StorageUnavailableError };

export type ProgressAttemptDraft = Omit<ProgressAttempt, 'committedAtRevision'>;

export type AppendOutcome =
  | { status: 'committed'; revision: number }
  | { status: 'duplicate'; revision: number }   // attemptId already present; nothing written
  | { status: 'rejected'; error: QuotaExceededError | StorageUnavailableError | ConnectionSupersededError };

export type SessionSummaryWrite = {
  session: Omit<SessionRecord, 'committedAtRevision'>;
  expectedRevision: number;             // revision-CHECKED — a summary publishes DERIVED state (§2.4, §8.4)
  cachedMastery: CachedMastery | null;  // optional derived publish; disposable
};

export type CommitOutcome =
  | { status: 'committed'; revision: number }
  | { status: 'duplicate'; revision: number }
  | { status: 'conflict'; currentRevision: number }   // REVISION_CONFLICT: reload, re-derive, retry
  | { status: 'rejected'; error: QuotaExceededError | StorageUnavailableError | ConnectionSupersededError };

export type ExportRequest = { mode: 'canonical' } | { mode: 'raw' };

export type ExportOutcome =
  | { status: 'exported'; mode: 'canonical' | 'raw'; json: string }
  | { status: 'not-canonical-exportable'; error: RecoveryRequiredError | NewerSchemaError }  // → retry with mode:'raw'
  | { status: 'unavailable'; error: StorageUnavailableError };

export type ResetConfirmation = {
  acknowledged: 'reset-with-confirmation';        // a literal — not producible by accident
  expectedRevision: number | 'unloadable';        // forces the caller to have LOOKED first
};

export type ResetOutcome =
  | { status: 'reset' }
  | { status: 'conflict'; currentRevision: number }   // another tab wrote since you looked
  | { status: 'rejected'; error: StorageUnavailableError };
```

**On `reset`.** `expectedRevision` does two jobs: it proves the caller loaded or diagnosed before
destroying (AL-R2 `:308`, "Export is available before destructive reset", in spirit), and it makes
reset revision-checked so it cannot silently destroy a concurrent tab's writes it never saw.
`'unloadable'` is the escape for a corrupt envelope and is obtainable only from `diagnose()`.

**An honest limit, stated so it is not mistaken for a guarantee.** The port **cannot** enforce "export
was offered before reset" — it cannot see the UI. This design refuses to fake that with an
`exportOffered: boolean` the caller can lie about. Instead the port guarantees raw export is
**reachable in every failure state** (§3.6), and "offer export before reset" is a **product obligation
verified in feature QA**, not a type.

### 3.5 The sixth slot: `diagnose()`, and where migration runs

**[DEVIATION]** The pin is a *behavior*, not a method. A separate `migrate(from, to)` was rejected:
**v1 has exactly one schema, so `migrate()` would ship with zero producers** — the exact phantom-field
failure §7 forbids. Additive-field-with-default migration also contains no user decision; the decisions
that *do* need a human (corrupt, newer) are covered by `diagnose` + `safeActions` + raw export +
confirmed reset.

- **Additive migration of a *known older* schema runs inside `load()` and is always *reported*** —
  `{status:'loaded', migrated:{from,to}}`. **"Explicit" contrasts with *silent*, not with *automatic*:**
  the caller cannot fail to learn that its data moved. It never restructures, never drops evidence, and
  never touches an unknown-newer or corrupt store.
- **`diagnose()` is the explicit migration/recovery surface.** Read-only, never mutates, works when
  `load()` cannot.

```ts
export type Diagnosis = {
  namespace: string;
  expectedSchema: number;
  detectedSchema: number | null | 'unreadable';    // null = namespace absent
  physicalStores: string[];
  recordCounts: Record<string, number>;
  migration:
    | { kind: 'none' }
    | { kind: 'additive-available'; from: number; to: number }
    | { kind: 'unsupported'; reason: 'newer-than-app' | 'restructuring-required' };
  integrity: { invalid: InvalidRecordRef[] };
  safeActions: SafeAction[];
};
```

`diagnose()` has real cycle-1 consumers: the migration/recovery gates (§11), the `'unloadable'` reset
path, and the future recovery UI. It is not speculative surface.

### 3.6 Raw export of an *unloadable* envelope

AL-R2 `:226-228` **mandates** `export-raw` as a safe action for both `RECOVERY_REQUIRED` and
`NEWER_SCHEMA`, while `:230` excludes the harness inspector from `ProgressStore`. As written, the
mandated action had no implementation: `exportJson()` is post-load and cannot export what cannot be
loaded. `exportSnapshot({mode:'raw'})` closes it, and the mechanism is the point:

> Raw export opens the database **with no version argument**. IndexedDB then opens at whatever version
> is physically present — it never triggers an upgrade and never fails with `VersionError`. It
> enumerates `db.objectStoreNames` and dumps every record **uninterpreted**. It therefore works at
> schema 999, at schema 1 with a corrupt record, and at any future schema this build has never heard
> of. Passing our expected version is exactly what would break it.

This is not the excluded inspector. The inspector was a **harness control** that could reach into
arbitrary databases and mutate them to synthesise failures. This is a **bounded, read-only dump of the
app's own namespace** — precisely the capability `export-raw` names. The *requirement* is imported;
the harness is not (AL-R2 `:37-39`).

```ts
type RawExport = {
  format: 'blackjack.progress.raw';
  formatVersion: 1;
  namespace: string;
  physicalVersion: number | null;        // db.version as found
  stores: Record<string, unknown[]>;     // every store → every record, uninterpreted
  errors: string[];                      // stores/records that could not be read at all
};
```

**Raw export must never validate.** The moment it applies the schema it loses the only property that
makes it useful.

---

## 4. Records

### 4.1 The attempt

```ts
export type AttemptKind        = 'comprehension' | 'classification' | 'navigation' | 'action';
export type EvidenceMode       = 'acquisition' | 'assessment' | 'diagnostic';
export type InteractionMode    = 'multiple-choice' | 'assemble-blocks' | 'engine-hand';
export type TableVisibility    = 'open' | 'hidden' | 'not-applicable';
export type PresentationSource = 'canonical' | 'ai' | 'cache' | 'fallback';
export type Assistance         = 'none' | 'retry' | 'instruction';  // mirrors learn/types.ts:40 BY VALUE, not by import
export type ErrorClass =
  | 'hand-classification' | 'dealer-column' | 'illegal-action'
  | 'strategy-recall' | 'fallback-rule' | 'outcome-bias';   // mastery :102-104; "at least" → additive later

export type AttemptDisposition =
  | { status: 'graded'; correct: true }
  | { status: 'graded'; correct: false; errorClass: ErrorClass | null }  // null = wrong but unclassified
  | { status: 'ungraded' }     // responded; no grading authority (e.g. free play action)
  | { status: 'abandoned' };   // presented; never responded — ALR-022 requires this fixture

export type ProgressAttempt = {
  // --- identity & ordering
  attemptId: string;            // opaque, CALLER-minted. Primary key AND idempotency key (§4.3).
  committedAtRevision: number;  // STORE-assigned inside the transaction. The only field the store writes.

  // --- attribution
  learnerKey: LearnerKey;
  sessionId: string;            // opaque episode label. NOT a foreign key into `sessions` (§4.2).
  presentationId: string;       // groups retries of ONE presentation (ALR-004, ALR-011)
  attemptOrdinal: number;       // 1 = first response on this presentation; >1 = retry

  // --- the evidence key: what mastery folds on
  evidence: {
    subjectId: string;
    unitId: string;
    skillId: string;            // FK → Subject.skills[].id. Today's `outcomeId`, renamed (F1).
    cellId: string | null;      // concept cell, opaque. null = this skill has no cell decomposition (§2.2).
  };

  // --- what was measured
  kind: AttemptKind;
  mode: EvidenceMode;           // diagnostic is STORED but excluded from mastery — by the reducer, not the store
  interaction: InteractionMode;
  difficultyBand: string | null;   // catalog-declared band; reducer input (design :406-408)

  // --- conditions the evidence was produced under
  assistance: Assistance;
  tableVisibility: TableVisibility;
  presentation: PresentationSource;  // design :272 — how the wording was produced, WITHOUT the wording

  // --- response & verdict
  response: JsonValue;          // structured. The ACTIVITY owns its schema (ALR-008); the store stores it opaquely.
  disposition: AttemptDisposition;

  // --- grading authority (design :270)
  gradedBy: {
    authority: 'engine' | 'oracle' | 'catalog' | 'none';
    profileId: StrategyProfileId | null;   // §4.4
  };
  engine: AttemptEngineContext | null;     // engine facts, shape reused BY VALUE from the bridge

  // --- replay identity (ALR-020, ALR-021, ALR-014)
  activity: {
    activityId: string;
    activityVersion: string;
    catalogVersion: string;
    seed: string | null;
    params: JsonValue;
  };

  // --- timing (ALR-022)
  occurredAt: string;           // ISO-8601 UTC. Recency/spacing input. Wall clock, caller-supplied.
  elapsedMs: number | null;     // presentation→response DURATION. Not a timestamp; clock-jump immune.

  // planning?: { planId; checkpointId; evidenceGoalId } — ABSENT in v1 (§7). Additive, zero migration.
};
```

**Why `disposition` replaces `correct: boolean | null`.** `boolean|null` expresses *ungraded*; it
cannot express *abandoned*, which ALR-022's verification clause demands ("fixtures cover correct,
incorrect, retried, hinted, **abandoned**, and ungraded"). The union also makes `errorClass`
**unrepresentable on a correct answer**, which a sibling nullable field could not. Note the contrast
with §7's phantoms: `abandoned` has no controller producer today either, but ALR-022 *requires the
fixture*, and the contract suite is its cycle-1 producer.

**Why `kind` has four values.** `:58-66` gives classification / navigation / action for *table
lookups*. Blackjack Foundations teaches literacy — `goal-check` ("what is the goal of a round?") is
none of those. `:30-31` names game literacy and rule literacy as stages 1–2; `'comprehension'` is that,
and it is grounded, not invented. **The enum was stress-tested against all seven stages at `:29-38`:**
chart literacy → classification + navigation; decision recall → action; procedural transfer → action in
an evolving hand; ruleset transfer → action + `profileId`; automaticity → action + `elapsedMs`. **No
stage forces a *split* of an existing value** — which matters enormously, because adding an enum value
is additive and safe, while *splitting* one is a re-keying that §8.1 forbids.

**Why `mode` and `interaction` are separate axes.** `mode` is evidence weight (ALR-005; the
first-exposure conflict resolution at `:429-433` — "allow a low-stakes diagnostic attempt, preserve it
as such … guesses do not become mastery evidence"). `interaction` is how it was asked. Today's
`interaction: LessonStep['type']` uses the wrong vocabulary: `'explain'` and `'recap'` are in that
union and **never produce attempts** (verified — `controller.ts` records only on question/hand). The
durable enum uses the ALR activity families, so unrepresentable values stop being representable.

**Why `reducerVersion` is NOT on the attempt. [DEVIATION from design `:265`.]** The Source lists
"curriculum, activity-factory, and **reducer** versions" among attempt fields. That is incoherent: an
attempt is *input* to the reducer, so tagging it with a reducer version means re-running a new reducer
over old evidence yields records stamped with a version that never touched them. The reducer version is
a property of the **derivation**, and the idb decision row pins its real home — cached mastery "tagged
with its reducer version". It therefore lives on `CachedMastery` and on `SessionRecord`.

**Why `difficultyBand` stays despite having no producer.** It is a *reducer input* — `:406-408` lists
difficulty explicitly. Unlike prose (§2.3) it is **not recoverable at runtime**, because a future build
ships one catalog version and cannot resolve an old one. `null` = "the activity declared no band", a
true fact about Foundations content, not a placeholder. It passes §7's rule.

### 4.2 The session

**No owned doc defined a session, and the vocabulary was already taken** — `SessionState` is the
engine's bankroll+shoe session, `sink.ts:6` `session_id` is a Free Play engine session, and
`LessonState.session` is the engine one leaking into learning.

**A learning session is one bounded learner-intent episode.** It opens when the learner starts a plan
with a chosen budget; it closes when the evidence target is met, a bound is reached, or the learner
stops (design `:288-296`; ALR-028). It is **not** the engine's session, not a tab lifetime, and not a
unit run.

Three consequences; the third is the keystone:

1. **A session is not resumable. Resuming starts a new session.** Grounded, not chosen: design `:295`
   says open goals "inform the **next** session, which may use different activities." So stop→resume =
   two sessions, a summary is written once and never updated, and `add()` semantics are correct (§5.1).
2. **The session record is born from `commitSessionSummary`, never from an "open session" write.** There
   is no `openSession` in the pinned six, and inventing one would permit phantom zero-evidence sessions.
3. **`attempt.sessionId` is NOT a foreign key.** It is an opaque episode label. A crashed tab leaves
   attempts pointing at a session record that will never exist — **correct, not a dangling reference.**

Why (3) is the keystone: cross-session mastery at `:114` needs only that sessions be **distinct**, and
distinctness is carried entirely by the id. "Evidence spans more than one session" = "attempts carry ≥2
distinct `sessionId`s". **This dissolves the abandonment problem without a clock** — no staleness bound,
no orphan sweep, no threshold this design has no authority to pick. It is confirmed from the other side
by design `:419`: "Ordinary sessions do not pass or fail and do not award mastery directly" — the
summary is a **report, not mastery input**, so a summary lost to a crash loses a report and zero
evidence. That is `:524` holding all the way down.

```ts
export type SessionRecord = {
  sessionId: string;
  learnerKey: LearnerKey;
  committedAtRevision: number;
  openedAt: string;
  closedAt: string;
  closeReason: 'evidence-target-met' | 'time-bound' | 'activity-bound' | 'learner-stopped';  // ALR-028, design :288-296
  budget: { presetId: string; targetDurationMs: number; maxActivities: number };             // ALR-027
  ruleset: Ruleset;                       // FULL object, once per session — the sink.ts:3-13 precedent, scoped correctly
  profileId: StrategyProfileId | null;
  reducerVersion: string | null;          // what was live during the episode
  curriculumVersion: string;
  summary: JsonValue | null;              // derived report; non-authoritative, recomputable
};
```

### 4.3 Attempt identity — explicit id, not session id + index

**An opaque `attemptId`, caller-minted before the write, doubling as the idempotency key. Plus
`committedAtRevision` (store-assigned, monotonic) for ordering.**

The decisive argument is the multi-tab case:

> `sessionId + index` requires the writer to know the next index → a read before every write → **two
> tabs both compute index N**. Worse, when the conflict loser reloads and recomputes, its index
> *changes* — so the retry carries a **different key** than the write that may already have landed. A
> derived id is not a stable idempotency key, and stability is the one thing an idempotency key must
> have.

An opaque caller-minted id is stable across any number of retries by construction — exactly what
"retries idempotently" (design `:522`) requires. Ordering comes free from `committedAtRevision`,
assigned by the winning transaction: no separate index, no race, monotonic by construction.

`sink.ts`'s `session_id + round_index` is **right for `sink.ts`**: a single-writer, append-only file
with no concurrent writer and no transaction. It is wrong for a multi-tab revisioned database. The
precedent is scoped, not ignored.

### 4.4 Strategy profile is pinned into evidence

`controller.ts:63-81` already gates lessons on `unit.profileId` via `checkStrategyCompatibility`.
`research-brief.md:32-40`: "Basic Strategy is not one universal table." ALR-015 requires comparing every
strategy verdict against "the active ruleset-matched authority"; ALR-018 requires feedback to reference
"the exact cards, dealer information, legal actions, **ruleset/profile**, and response that were
graded." Without it, S17 evidence is indistinguishable from H17 and the record is strategy-ambiguous.

**`gradedBy.profileId: StrategyProfileId | null` is on every attempt. The full `Ruleset` object is
not.** `sink.ts:3-13` puts the whole ruleset in a session header — once per session — and that shape is
reused: the full `Ruleset` goes on `SessionRecord`. The attempt stays self-sufficient anyway:

- `profileId` is the **strategy-answer**-relevant identity — it is what `checkStrategyCompatibility`
  validates the live ruleset against; and
- `engine.legalActions` already captures the ruleset's **observable effect on that decision** — the
  legal set as the learner actually saw it.

So a crashed session losing its `SessionRecord` loses the ruleset *report* and zero evidence — the same
property as §4.2. **Residual, named:** if a future consumer needs full-ruleset replay per attempt, that
is an additive `gradedBy.rulesetId` once the catalog assigns ruleset identities. Trigger: a second
verified profile (`research-brief.md:51` already gates the profile matrix on exactly that).

### 4.5 The envelope

```ts
export type CachedMastery = {
  reducerVersion: string;        // PINNED: idb decision row — the cache is allowed only if tagged
  computedAtRevision: number;    // staleness checkable WITHOUT recomputing
  states: JsonValue;
};

export type LearnerEnvelope = {
  schemaVersion: number;
  learnerKey: LearnerKey;
  revision: number;
  curriculumVersions: string[];        // every catalog version encountered
  attempts: ProgressAttempt[];         // ordered by committedAtRevision, then attemptId
  sessions: SessionRecord[];
  cachedMastery: CachedMastery | null; // disposable; the ONLY licensed lossy operation (§8.1)
};
```

`computedAtRevision`: without it you must recompute mastery to discover whether you needed to recompute
mastery, which defeats the cache's only purpose (startup speed, design `:253`).

**[DEVIATION]** AL-R2's envelope has a top-level `reducerVersion` *and* `cachedMastery`. It is moved
inside: a null cache has no reducer, and two fields make `{reducerVersion:"v3", cachedMastery:null}`
representable and meaningless. This is a rename/restructure of the **research** envelope, permitted at
`:128-131`; no gate depends on its position.

### 4.6 The `schema_version`-per-line conflict, settled

`sink.ts:3-23` puts `schema_version` on **every line**. AL-R2's `ResearchEnvelope` puts `schemaVersion`
on the **outer envelope**. Both are right, in different media:

- **JSONL is a headerless, concatenable stream.** There is no container to version, and lines written by
  different builds can end up in one file. Each line **must** be self-describing. It is also a wire
  format read by an external Python layer.
- **ProgressStore is a transactional database with a `meta` singleton.** The envelope *is* the
  container. Per-record versions would permit **mixed-version records inside one store**, making
  migration non-atomic and making "byte-identical canonical re-export" (AL-R2 `:216`) undefinable — you
  cannot canonicalise a store whose records disagree about what they are.

**Decision: the outer envelope owns `schemaVersion`; records carry none.** AL-R2's contract wins because
it is the one with migration evidence behind it. But `sink.ts` earns a real lesson: **an export is a wire
format**, and so the *export* envelope is self-describing at its top level (§5.2) — the same instinct,
applied at the container level, where a container exists.

---

## 5. Layout, canonical export, and the export wrapper

### 5.1 Physical layout — three stores

```text
database: `${namespace}`     version: schemaVersion

  meta        keyPath 'id'         singleton id='envelope'
                                   { id, schemaVersion, learnerKey, revision, curriculumVersions[], cachedMastery }
  attempts    keyPath 'attemptId'  index 'by-revision' → committedAtRevision
  sessions    keyPath 'sessionId'
```

**The `idempotency` store is gone, and that is a strengthening.** AL-R2 needed a fourth store because
`CheckpointWrite.idempotencyKey` was a *separate* key — a checkpoint bundled many attempts plus a
summary and had no natural primary key. Splitting into per-record operations makes **each record's own
primary key its idempotency key**:

> The adapter uses `store.add()`, not `store.put()`. A duplicate key raises `ConstraintError` **from the
> database**. Idempotency stops being application bookkeeping that can be buggy and becomes a constraint
> the store cannot violate. The adapter catches `ConstraintError`, reads the existing record, and returns
> `{status:'duplicate', revision: existing.committedAtRevision}` — the same answer AL-R2's contract
> returns, from a stronger mechanism.

**[DEVIATION — named risk]** This departs from the *proven* four-store physical layout. The license:
AL-R2 `:37-39` says production tests "should adapt the relevant gates to the real application contract
rather than importing the research adapters" — the **properties** are binding; the layout is not. The
obligation is explicit: **§11's gates must re-prove atomicity, idempotency, and abort-rollback on *this*
layout. Nothing is inherited.**

Transaction scope: `appendAttempt` = one `readwrite` tx over `meta` + `attempts`.
`commitSessionSummary` = `meta` + `sessions`. Smaller scope than the proven four is not weaker —
atomicity is over the stores a write *touches*, and both remain all-or-nothing.

**Index discipline.** Exactly one index: `by-revision`. It has a cycle-1 consumer — canonical export's
deterministic ordering (§5.2), which is a gate. `by-skill` is the obvious second index and has **no
cycle-1 consumer** (nothing queries; `load()` returns everything and the reducer folds in memory), so
by §7's own rule it is omitted. Adding an index later is additive.

**`cachedMastery` lives in `meta`.** Minimal layout; cycle 1 writes no cache. Known cost: every revision
bump rewrites the whole meta singleton, cache included. **Trigger for a separate `mastery` store: a
measured meta-write cost once a real reducer publishes.** Adding a store is additive, so deferring is
free.

### 5.2 Canonical export

`exportSnapshot({mode:'canonical'})` returns **content-only, deterministic bytes**:

- **No wall clock.** An `exportedAt` field would break AL-R2's `:216` gate outright — "reopening and
  re-running the v2 path produces byte-identical canonical export" cannot hold with a timestamp in the
  bytes. This is *why* the gate works: canonical export is a pure function of content.
- **Explicit key order.** `JSON.stringify` preserves *insertion* order, which for records read back from
  IndexedDB is structured-clone order — an implementation detail, not a contract. `progress/canonical.ts`
  writes keys in a **declared** order. Cheap; it is the only thing that makes byte-identity actually hold
  rather than accidentally hold.
- **Explicit array order.** attempts by `(committedAtRevision, attemptId)`; sessions likewise.
- **Absent keys stay absent** — never emitted as `null`. Coherent with §7.

```ts
type CanonicalSnapshot = {
  format: 'blackjack.progress.snapshot';
  formatVersion: 1;           // the EXPORT format's version — independent of schemaVersion
  schemaVersion: number;      // the envelope schema exported
  namespace: string;
  learnerKey: string;
  revision: number;
  curriculumVersions: string[];
  attempts: ProgressAttempt[];
  sessions: SessionRecord[];
  cachedMastery: CachedMastery | null;
};
```

### 5.3 The export wrapper — and its approved limitation

The **downloaded file** may wrap the canonical snapshot:
`{ meta: { exportedAt, appVersion }, snapshot: <canonical> }`. The byte-identity gate applies to
`snapshot`. **The clock lives in the wrapper, never in the evidence.**

The wrapper is also where resolved copy may be inlined if a later consumer wants readable output — it
sits outside the gate, so the durable schema stays clean and byte-identity stays intact. **Carrying
§2.3's approved limitation forward:** such resolution reads the **current** catalog while attempts carry
`catalogVersion`, and old catalogs live in git, not at runtime. A resolved export is **approximately,
not verbatim, faithful** — v1 answers may be shown against v2 wording. **Never call an export a
"transcript".**

---

## 6. Identity

**[PINNED]** (`journal/decisions.md`, 2026-07-17): a random opaque local key, minted on first use,
scoped to origin + browser profile, **pseudonymous**. Never "anonymous", never "device", no format in
the name. Hence `learnerKey`, an opaque branded string — not `deviceId`, not `learnerUuid`, not
`anonymousId`.

**`load()` on an empty namespace mints NOTHING and returns `{status:'empty'}`. The key is minted by the
first `appendAttempt`, inside that same transaction.**

AL-R2 `:304` requires the schema version and learner key to "exist before the first durable attempt".
Same-transaction creation satisfies that in commit order and is *stronger* than a prior separate write,
which could leave an orphan identifier if the app closes before any evidence exists. And **opening the
app creates no identifier at all** — data minimisation (PRIV-001) for free.

`mintLearnerKey: () => LearnerKey` is injected at open: **synchronous** (§9 forbids caller async inside
a transaction), deterministic in fixtures, and **format-agnostic** — `crypto.randomUUID` is the
production default, but the port must not know that, per the "do not let the format ride in the name"
clause of the ADR.

**The store assigns exactly one field: `committedAtRevision`.** Everything else — including
`occurredAt` — is caller-materialized evidence. The store must not invent evidence, and must not stamp
time it did not observe.

---

## 7. The phantom rule

`planId`, `checkpointId`, and `evidenceGoalId` are **ABSENT in v1** — not nullable, not sentinel — and
arrive as **one optional group**, not three fields:

```ts
// v2+, when SessionPlanner/SessionController exist. Presence means "planner-produced".
planning?: { planId: string; checkpointId: string; evidenceGoalId: string };
```

The rule, stated once and applied throughout:

> **A `null` is allowed when it is a real value in the domain. It is forbidden when it is a placeholder
> for a producer that does not exist.**

- `cellId: null` = "this skill has no cell decomposition" (`'goal'` genuinely has none). **Real** — see
  §2.2; this is not a carve-out.
- `elapsedMs: null` = "not measured". Real.
- `profileId: null` = "no strategy authority graded this". Real.
- `planId: null` = **nothing.** It cannot be distinguished from "a planner ran and declined to set it."
  It is a lie with a type.

Three supporting arguments:

1. **Omission is cheaper than nullable *and* cheaper than migration.** An optional field added to a
   TypeScript type needs **no IndexedDB migration at all** — structured clone stores what is there and
   readers see `undefined`. AL-R2's v1→v2 migration was needed only because it wanted
   `assistance: "none"` *materialized*. If "absent means absent," there is no data migration and no
   schema bump. The usual argument for nullable-now ("avoid a migration later") buys nothing here.
2. **Absence is information.** A v1 record without `planning` truthfully says "produced before planners
   existed." A v1 record with `planning: null` falsely says "a planner could have set this."
3. It is the discipline the AL-D1 re-scope was founded on. Inventing a `planId` in a fixture would be
   fiction the contract suite then certifies.

**[DEVIATION from design `:264`]**, which lists plan/checkpoint/evidence-goal IDs under "Every graded
attempt records at least". Justification: `:264` describes the record in a cycle where
`SessionController` exists. The 2026-07-17 scope decision *already ruled* that the authority table
"assigns attempt production to a `SessionController` that does not exist." Cycle 1 precedes it, and the
group is additive at zero cost when it arrives.

**Where the rule draws the other way — `catalogVersion` and `cachedMastery` stay required.** Both also
lack producers today (`Subject` has no version field; there is no reducer). Both are pinned by AL-R2's
**approved envelope** (`curriculumVersions`, `cachedMastery`, `:100-109`), and both can be given a
**real, meaningful value by a cycle-1 fixture** — fixtures *are* versioned catalogs. The test:

> **Can some cycle-1 artifact give this field a value that is true?** `catalogVersion` in a fixture:
> yes. `planId` in a fixture: no — it would be invented.

Also deferred into `planning`: the evidence *context* axis at design `:408` (guided practice / review /
mastery check / skip test). All four are **planner selections**, so they belong with the planner. `mode`
(acquisition/assessment/diagnostic) stays on the attempt because it carries the mastery-**eligibility**
decision the reducer cannot live without (ALR-032), and a fixture can set it truthfully.

---

## 8. Policies

### 8.1 Migration — additive-only, by construction

**[PINNED]** The only proven migration is additive-field-with-default, verified by byte-identical
canonical re-export (AL-R2 `:211-216`). No license for restructuring or lossy migration exists.

1. **Optional fields are added by omission.** No data migration, no schema bump (§7).
2. **Materialized defaults are the only migration that bumps the schema** — cursor-transform inside the
   `versionchange` transaction, verified byte-identical against a golden fixture. Exactly AL-R2's proven
   shape, and nothing else.
3. **Never rename, never re-key, never re-nest.** The keys must be right now: `learnerKey`, `attemptId`,
   `sessionId`, `evidence.skillId`, `evidence.cellId`. This is the whole reason §2.2 exists.
4. **Never split an enum value.** Adding `AttemptKind` values is additive; splitting `'comprehension'`
   would be a re-key. §4.1 records the stress test against `:29-38`'s seven stages.
5. **Reserve nothing speculatively.** No `extra: {}` bag. It defeats validation, becomes a dumping
   ground, and buys nothing optional fields do not already give free.
6. **One `schemaVersion`, on the envelope** (§4.6) — one migration gates one coherent store.
7. **The only licensed lossy operation is discarding `cachedMastery`**, because it is reproducible by
   definition (design `:253`; idb decision row). Nothing else may be dropped, ever.

### 8.2 Quota exceeded

`{status:'rejected', error: QuotaExceededError}`, `safeActions: ['export-raw',
'reset-with-confirmation', 'retry']`. The session continues **in memory, marked unsaved** (design
`:522`). Already committed attempts remain valid.

**The store never deletes anything to make room.** Raw attempts are the sole durable truth; evicting old
evidence to fit new evidence destroys reproducibility and is a silent partial reset. The only space
recovery is user-directed — **which is exactly why export must precede reset**, since reset is the only
thing that frees space and it destroys everything.

### 8.3 Denied / private-mode IndexedDB

Knowable at open → `{status:'unavailable', error:{reason:'denied'|'private-mode'|'absent'}}`.

**The product must run — but it must never silently swap to memory.** A silent in-memory fallback *is*
the UI claiming a save it does not have; it violates `:522` at the level of the whole feature rather
than one write. The app surfaces "progress will not be saved in this browser/mode" and the learner
proceeds *knowingly*. AL-R2 also rejected in-memory **for durable progress** (`:295`) — it is a
baseline, not an adapter, and it fails exactly the two gates (reload, concurrent tabs) a degraded mode
openly does not offer. ALR-023's "deterministic fallback" is scoped to **AI/network** and cannot be
borrowed here.

**Cycle-1 scope:** the fake ships for tests; the *product* degraded mode lands with the UI consumer
(§13.5), because it has no consumer now. The policy is recorded here so cycle 3 does not reinvent it.

### 8.4 Corruption, concurrency, and `versionchange`

**Corrupt records — fail closed.** `{status:'recovery-required'}` with `{namespace, detectedSchema,
safeActions:['export-raw','reset-with-confirmation'], invalid: InvalidRecordRef[]}`. **No automatic
reset, ever** [PINNED].

One bad record fails the whole load. This is harsh and deliberate: silently skipping a corrupt attempt
would make mastery non-reproducible *and hide data loss* — the reducer would quietly produce a different
answer than the evidence supports. Three mitigations make it survivable: `export-raw` retrieves
**everything, including the good records** (§3.6); `diagnose().integrity` itemises *which* records
failed and why; and surgical repair remains a named future, triggered by an observed real corruption,
not a hypothetical.

**Two tabs on one learner key.** Per §2.4:

- **`appendAttempt` takes no `expectedRevision`.** It commits unconditionally and assigns the next
  revision *inside* the transaction (read `meta.revision`, +1, write meta + attempt in one `readwrite`
  tx). IndexedDB serialises `readwrite` transactions with overlapping scope across connections in the
  same origin, so the read-modify-write is atomic across tabs. Both tabs succeed, at distinct revisions,
  with no lost update.
- **`commitSessionSummary` keeps `expectedRevision`**, because a summary (and any `cachedMastery` it
  publishes) is **derived from all attempts** — one computed at revision 5 is genuinely stale if another
  tab appended at revision 6. That is where a lost update loses information, and that is where the check
  belongs.
- **Idempotency is unaffected**: `attemptId` is the primary key, enforced by `add()` (§5.1).
- **Rejected: a Web Locks single-writer election.** New machinery, no admission, no gate evidence, and
  unnecessary — IDB's own serialisation already delivers the proven property.

**`versionchange` blocking.** If tab A holds a connection and tab B opens at a higher version after an
app update, B's upgrade blocks on A (BROWSER-003, "blocked older connections"). The adapter registers
`onversionchange` → closes its connection → every subsequent operation returns
`ConnectionSupersededError` with `safeActions: ['reload']`. **Never block silently, never fight it.**

---

## 9. Transaction lifetime, expressed in the signatures

**[PINNED]** LIB-002 (AL-R2 `:67`): `idb` "retains native transaction lifetime; unrelated awaited work
can auto-close a transaction."

**The adapter accepts a fully-materialized write and owns the transaction end-to-end, with no
caller-supplied async inside it.** How the signatures enforce it:

1. **No callbacks anywhere in the port.** No `withTransaction(fn)`, no `write(producer)`, no
   `onUpgrade(cb)`. Every operation is **plain data in, plain data out**. There is no operation that
   yields control to the caller while a transaction is open — not by convention, but because it is
   unrepresentable in these types.
2. **Every write argument is structured-clone-safe.** No functions, no Promises, no class instances, no
   lazy getters. `ProgressAttemptDraft` and `SessionSummaryWrite` are plain serializable values, asserted
   structurally by the suite rather than trusted.
3. **`load()` returns a fully-materialized envelope, not a cursor or async iterator.** An iterator would
   invite the caller to `await` between reads and auto-close the transaction — the exact hazard.
4. **Canonical export reads inside the transaction and serializes after it closes.**
5. **`mintLearnerKey` is synchronous** (§6) — an async key mint inside the first-write transaction would
   auto-close it. This is the second, independent reason `attemptId` is caller-minted: idempotent retry
   needs a stable id (§4.3), *and* nothing async may run inside the tx. Both arguments converge on the
   same signature.

This is also what keeps the port adoptable by the synchronous lesson stack (F3): with no callback, an
async caller wraps each operation whole. `LessonController`'s synchronicity does not conflict with this
port — it simply cannot *call* it yet, which is cycle 3's problem and not a shape problem.

---

## 10. Retention — no cap in v1

**[PINNED]** Keep raw attempts; owned docs impose **no cap**, and retention appears only under the
**unfired** telemetry trigger (`research-brief.md:23`). This design has no authority to import one.

**v1 does nothing.** No cap, no compaction, no TTL, no eviction.

This is not merely *unauthorized* — it is also probably *fine*. AL-R2's stress tier was 10,000 attempts
and the harness "records serialized fixture bytes", so the real number is measurable rather than
guessable. **No byte figure is asserted here; §11 makes measuring it a gate** (serialized envelope bytes
at 20 / 1,000 / 10,000 against the real record shape). That converts "no cap" from an assumption into a
measured claim, cheaply.

**Triggers that would earn a bound** — any one, and only with evidence:

1. `QUOTA_EXCEEDED` observed in real use (not synthesised);
2. the external-beta telemetry trigger firing (`research-brief.md:23`);
3. a measured `load()` latency problem (AL-R2's deferred 30-sample protocol, `:180-199`).

**Constraint on any future bound:** it may **never** be a silent delete. Raw attempts are the sole
durable truth; bounding them silently makes mastery non-reproducible and breaks ALR-033 / design `:253`.
A bound must be an **export-first compaction** or an explicit user action. Recorded now so a future quota
panic cannot quietly invent one.

---

## 11. The contract suite — 14 gates, re-derived

**[PINNED]** Provider-neutral, runnable against **both** a fake and the `idb` adapter (design `:539`).
**The extracted research harness may NOT be imported** — it lives at
`dev-toolkit/browser-storage-conformance`, outside this repo (AL-R2 `:29-39`).

AL-R2 reports 210 cells = 15 rows × **14 gates**, and 42/42 = 14 × 3 browsers — but it never enumerates
the 14 by name, and the harness is out of repo. These 14 are **re-derived** from the report's seven
result columns (`:160-166`) plus its migration/recovery prose (`:218-230`):

| # | Gate | Re-derives (AL-R2 column) | Label |
|---|---|---|---|
| 1 | `open-empty` — fresh namespace loads `empty`; mints nothing | Reload | OBSERVED |
| 2 | `reload-persistence` — committed attempts survive a fresh connection | Reload | OBSERVED |
| 3 | `atomic-commit` — one append writes attempt + `meta.revision` in one tx | Atomic commit | OBSERVED |
| 4 | `write-abort-rollback` — an aborted append leaves meta AND attempts unchanged | Atomic commit | SYNTHETIC |
| 5 | `idempotency-duplicate` — re-appending an `attemptId` returns `duplicate`, writes nothing | Idempotency | OBSERVED |
| 6 | `revision-conflict` — stale `expectedRevision` on a summary → `conflict`; reload+retry succeeds | Revision conflict | OBSERVED |
| 7 | `concurrent-appends` — two connections append distinct attempts; both commit, distinct revisions, no lost update | Concurrent tabs | OBSERVED |
| 8 | `canonical-export-stable` — same content exports byte-identically across two loads | Export/reset | OBSERVED |
| 9 | `export-precedes-reset` — canonical export available while data exists; reset demands confirmation + revision | Export/reset | OBSERVED |
| 10 | `complete-reset` — reset removes the complete envelope; next load is `empty` | Export/reset | OBSERVED |
| 11 | `migration-additive` — a v1 fixture opens at v2, gains the defaulted field, re-exports byte-identically vs a golden | Migration/recovery | OBSERVED |
| 12 | `migration-abort-rollback` — an aborted upgrade leaves the store physically at v1; retry succeeds | Migration/recovery | SYNTHETIC |
| 13 | `corrupt-recovery` — malformed record → `RECOVERY_REQUIRED{namespace, detectedSchema, safeActions:['export-raw','reset-with-confirmation']}`; **no reset**; **raw export still returns the records** | Migration/recovery | SYNTHETIC |
| 14 | `newer-schema-refusal` — schema 999 → `NEWER_SCHEMA{…, safeActions:['export-raw','upgrade-app']}`; **no reset**; **raw export still works** | Migration/recovery | SYNTHETIC |

Gates 13–14 carry a clause AL-R2's harness could not: **raw export works in the failure state.** That is
§3.6's hole closed by a test rather than by a paragraph.

**Gate 7 also closes a standing QA coverage gap** — `journal/qa/ledger.md` carries "multi-tab races
untried" forward. It closes it for `ProgressStore` specifically, not for the app at large.

**Fake vs adapter divergence, handled honestly.** The fake is in-memory: gates 2 and 7 cannot pass.
AL-R2 recorded in-memory as **12/14** (`:162`), and that record is preserved rather than faked. The suite
reads a declared `capabilities: { durable, multiConnection }`, and for `durable:false` it **asserts the
store does not claim durability** — a declared, tested non-capability. A fake that silently "passed"
reload would be the contract suite lying about the one property the port exists for.

---

## 12. Deviations register

Every departure from an approved doc's letter, with status. This table is the document's contract with
its own sources.

| # | Deviation | From | Status | Why |
|---|---|---|---|---|
| 1 | `reducerVersion` off the attempt | design `:265` | approved | An attempt is reducer *input*; the version is a property of the derivation. Home: `CachedMastery` (pinned by the idb row) + `SessionRecord`. §4.1 |
| 2 | plan/checkpoint/evidence-goal IDs absent | design `:264` | approved | No producer; a null there is meaningless. Optional group, zero-cost additive. §7 |
| 3 | Three stores, not four | AL-R2 `:164-165` | approved | The 4th keyed a compound checkpoint. Per-record ops make the primary key the idempotency key, enforced by `add()` — stronger. Gates re-prove it. §5.1 |
| 4 | **`appendAttempt` unconditional (no `expectedRevision`)** | AL-R2 `:118-125`, `:128-131` | **approved 2026-07-17 — explicit deviation, not a silent choice** | Two approved pins conflict; rejecting a second tab's genuine append would destroy evidence to satisfy the lower one. Appends commute; splitting is licensed at `:128-131`; the check moves to the half that replaces derived state. IDB same-origin overlapping-scope serialisation checked and holds. §2.4, §8.4 |
| 5 | Envelope `reducerVersion` moved into `cachedMastery` | AL-R2 `:100-109` | approved | Removes the impossible `{reducerVersion set, cache null}` state. `:128-131` permits rename/restructure. §4.5 |
| 6 | `open`/`close` off the semantic six | AL-R2 `:118-125` | approved | Lifetime, not semantics. A factory makes use-before-open unrepresentable. §3.2 |
| 7 | Sixth slot = `diagnose()`; migration reported inside `load()` | design `:172` | approved | A `migrate()` would ship with zero producers — the phantom pattern §7 forbids. "Explicit" = never silent, not never automatic. §3.5 |
| 8 | Raw export inside the port | AL-R2 `:230` (inspector excluded) | approved | `export-raw` is *mandated* at `:226-228` and had no implementation. A bounded read-only dump of our own namespace is the mandated action, not the harness control. §3.6 |

---

## 13. Open prerequisites this design creates

Downstream obligations. They are **not** cycle-1 work; they are named here so they cannot be discovered
late.

1. **The catalog must gain a version field.** `Subject` (`learn/types.ts:38`) has none; `catalogVersion`
   is required on every attempt and pinned by AL-R2's envelope. Fixtures cover cycle 1; cycle 2/3 must
   make it real. **Blocks the first real write.**
2. **The catalog must assign stable, injective cell ids** (§2.2). **Blocks the first real write.**
3. **The `outcomeId` → `skillId` rename** in curriculum/controller (F1). Cycle 1 renames only in the
   durable projection (scope forbids controller changes); the in-memory record keeps its collision with
   `HandOutcome.outcomes` until cycle 2/3.
4. **The `LessonController.AttemptRecord → ProgressAttempt` mapper** is the missing producer (§3.1) —
   cycle 3, with the UI consumer.
5. **The denied-storage product policy** (§8.3) needs the UI consumer to land.
6. **A `mastery` store split** if a measured meta-write cost appears once a real reducer publishes
   (§5.1). Additive; deferring is free.
