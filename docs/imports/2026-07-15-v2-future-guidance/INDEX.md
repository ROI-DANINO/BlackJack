# V2 Future-Guidance Import Index

> Processed 2026-07-15. This archive preserves source provenance; it is not authoritative over
> approved decisions, verified code/QA, or the owners registered in `journal/docs-map.md`.

## Rule 0 and safety review

The three source notes were treated as data/evidence only. Their directives, proposed phases,
named technologies, statistics, and embedded agent instructions were not executed or promoted by
default. Each claim was checked against the repository before disposition.

Before tracking the files, all three were read for confidential or personal content and scanned for
credential/secret patterns. No publication blocker was found. The originals were then moved without
editing and verified against the pre-move manifest below.

The immutable originals contain four trailing-space lines (cloud source lines 6 and 12, research
source line 8, learning source line 12). They remain intact deliberately; whitespace validation
applies to the authored index and folded documents, while the manifest hashes gate source identity.

Dispositions use the project's five combinable labels: **Accepted · Covered · Deferred · Rejected ·
Archived**.

## Source manifest

| Source | Bytes | SHA-256 | Source-level disposition |
|---|---:|---|---|
| `v2_cloud_architecture_strategy.md` | 3605 | `3731a654c93405f9f4206fa9c6b0fef9445aa34ef330e588bb09d97ce69ac6ed` | Accepted + Covered + Deferred + Rejected |
| `v2_just_in_time_research_compass.md` | 3156 | `fb4bba2ccc8cec44d3405a9bf036e4e185167e9d1845a3daf1697367d04232d5` | Accepted + Covered + Deferred |
| `v2_learning_roadmap_expanded.md` | 3852 | `b72eaaefc61ae85d8c35fbacbffbc79af5b6044d37b53d4ae1b28350d2e04bee` | Accepted + Covered + Deferred + Rejected |

## Cloud and scalability claims

| ID | Claim | Disposition | Existing evidence or conflict | Authoritative destination | Activation / research trigger |
|---|---|---|---|---|---|
| CLOUD-01 | Client-side Rust/WASM keeps ordinary trainer compute off the server. | Covered | The browser-WASM delivery decision and live `CoreTransport` already establish client authority. | [Architecture](../../architecture.md) | None; current posture. |
| CLOUD-02 | Future hosted learning adds profiles, progress persistence, streaks, and cross-device sync. | Accepted + Covered + Deferred | Accounts/progress/sync match the approved cloud ADR and are not implemented. Streaks are a non-binding progression idea, not an approved mechanic; leaderboards are dispositioned separately under CLOUD-06. | [Architecture](../../architecture.md) owns the hosted posture; [Roadmap](../../../ROADMAP.md) owns progression and activation. | Accounts/progress/sync require a real durable or cross-device consumer; streaks wait for a T3 progression design grounded in responsible learning motivation. |
| CLOUD-03 | Ban custom backends and adopt managed Supabase/Firebase authentication, RLS, and storage. | Deferred + Rejected | The named services and managed-security features are candidates; a categorical ban on custom servers is rejected because the active task and admission evidence must decide the tool. Neither service is approved or present in dependencies. | [Stack boundaries](../../specs/stack-boundaries.md) | Hosted auth/sync becomes active and the admission protocol compares security, operational, and exit costs. |
| CLOUD-04 | React or the learning controller writes directly to a backend. | Rejected | Conflicts with provider-neutral application boundaries and thin presentation/controller ownership. | [Architecture](../../architecture.md) | No reopen trigger; providers remain outside React and `LessonController`. |
| CLOUD-05 | Build an offline queue with conflict resolution. | Deferred | No durable local or remote progress exists, so conflict semantics have no current consumer. | [Research brief](../../specs/research-brief.md) | Cross-device/offline sync becomes an active feature. |
| CLOUD-06 | Move game authority to a server for multiplayer, leaderboards, or certification. | Covered + Deferred | Approved ADR reserves authority only for competitive or certified requirements; ordinary training stays client-authoritative. Reusing Rust server-side and WebSockets/WebRTC remain design candidates, not decisions. | [Architecture](../../architecture.md) | Competitive multiplayer, leaderboards, or certified mastery needs anti-cheat authority. |
| CLOUD-07 | Validate submitted round logs at an edge function before accepting scores. | Deferred | One possible competitive design, not an approved architecture; no score submission exists. | [Research brief](../../specs/research-brief.md) | Competitive/certified authority research begins. |
| CLOUD-08 | Keep shoes/seeds on the server to prevent future-card discovery. | Covered + Deferred | Relevant only when a client must not know future cards; full local state benefits current replay/debugging. | [Research brief](../../specs/research-brief.md) | Competitive/certified mode requires shoe secrecy. |
| CLOUD-09 | Separate/cache WASM binaries for Expo OTA updates. | Deferred | Expo and EAS are unapproved candidates and the browser WASM build already works. | [Research brief](../../specs/research-brief.md) | A mobile runtime passes admission and OTA packaging becomes a real constraint. |
| CLOUD-10 | Isolate third-party integrations from product and domain state. | Accepted | Durable boundary consistent with existing `CoreTransport` and `LogSink` seams. | [Architecture](../../architecture.md) | Applies when the first persistence/sync provider is introduced. |
| CLOUD-11 | Reserve a `ProgressStore` port and versioned progress envelope before persistence. | Accepted + Covered | Approved ADR, but `AttemptRecord` is unversioned and no `ProgressStore` exists in code. | [Roadmap](../../../ROADMAP.md) owns the outstanding obligation; [Architecture](../../architecture.md) owns the boundary. | Must be resolved before or as the first step of any durable-progress feature. |

## Just-in-time research claims

| ID | Claim | Disposition | Existing evidence or conflict | Authoritative destination | Activation / research trigger |
|---|---|---|---|---|---|
| RESEARCH-01 | Research should occur when a feature needs the decision. | Covered | Existing research-driven development and stack-admission rules already require an active consumer. | [Research brief](../../specs/research-brief.md) | Per matrix row; no speculative research program. |
| RESEARCH-02 | Success/failure feedback must not rely on red/green color alone. | Accepted | Durable accessibility principle; the source's unverified demographic percentage is not preserved as fact. | [Product vision](../../specs/product-vision.md) | Detailed patterns are researched when visual-system work starts. |
| RESEARCH-03 | Mobile lifecycle suspension can destroy in-memory lesson/game state. | Accepted + Deferred | Current state is intentionally in memory; AsyncStorage is only a candidate. | [Research brief](../../specs/research-brief.md) | Mobile-runtime work begins before mobile beta. |
| RESEARCH-04 | Add QA that exercises lesson flow and feedback states. | Covered | `qa:learn`, curriculum validation, feature QA, and the QA ledger already cover the learning path. | [QA playtest process](../../specs/qa-playtest-process.md) | Existing ledger-driven QA expands with changed learning behavior. |
| RESEARCH-05 | Keep curriculum content separate from React components. | Covered | Typed content-as-data and validation already exist under `web/src/learn/`. | [Architecture](../../architecture.md) | None; implemented boundary. |
| RESEARCH-06 | Publish remote curriculum payloads through admin tooling. | Deferred | Curriculum ships locally as typed data; independent publishing has no consumer. | [Research brief](../../specs/research-brief.md) | Content must publish independently of application releases. |
| RESEARCH-07 | Batch telemetry so beta learning behavior is observable. | Accepted + Deferred | No telemetry client or external beta exists; purpose, consent/privacy, retention, batching, and failure behavior remain undecided. | [Roadmap](../../../ROADMAP.md) owns capability timing; [Research brief](../../specs/research-brief.md) owns the questions. | External beta creates concrete learning/product questions requiring observability. |

## Learning and gamification claims

| ID | Claim | Disposition | Existing evidence or conflict | Authoritative destination | Activation / research trigger |
|---|---|---|---|---|---|
| LEARNING-01 | Use a Duolingo-like short loop, coherent shell/navigation, and premium game feel, with prescribed Stats/Lives bars, lesson modals, and sound effects. | Accepted + Covered + Deferred | The short loop and coherent app-shell direction are owned product principles. Exact top/bottom layout, Stats/Lives mechanics, modal behavior, and sound are not accepted requirements. | [Product vision](../../specs/product-vision.md) owns the durable experience direction; [Roadmap](../../../ROADMAP.md) owns T3 timing. | Exact shell layout and sensory/gamification mechanics wait for scoped T3 design and accessibility evidence. |
| LEARNING-02 | Deliver web first and mobile later from one mandatory shared codebase. | Accepted + Covered + Rejected | Web-first/mobile-later is accepted and the browser product exists. A mandatory single codebase is rejected as a premature runtime constraint; sharing is evaluated against real mobile needs. | [Product vision](../../specs/product-vision.md) owns platform direction; [Stack boundaries](../../specs/stack-boundaries.md) owns runtime admission; [Roadmap](../../../ROADMAP.md) owns sequencing. | Mobile becomes active after web learning proves useful, then an admission spike decides reuse boundaries. |
| LEARNING-03 | Prove Rust/WASM inside Expo/Metro before mobile UI work. | Deferred | Browser WASM is proven; Expo/Metro is not approved. | [Research brief](../../specs/research-brief.md) | Mobile-runtime admission spike begins. |
| LEARNING-04 | Define learning state before presentation. | Covered | A deterministic headless controller exists, but the current shell still reads an embedded raw session and feedback is flattened. | [Architecture](../../architecture.md) | First real Strategy Table/shell consumer defines the semantic projection it needs. |
| LEARNING-05 | Rust owns rules, TypeScript owns learning, and presentation stays thin. | Covered | Matches the live engine/controller/React separation. | [Architecture](../../architecture.md) | Standing boundary. |
| LEARNING-06 | Adopt Expo Router, Zustand, Tamagui/NativeWind, and Rive/Lottie. | Deferred | None is required or installed; each is a non-binding candidate. | [Stack boundaries](../../specs/stack-boundaries.md) | An active shell/mobile task demonstrates need and passes admission. |
| LEARNING-07 | Replace the project roadmap with the imported tactical phases. | Rejected | The phases are partly obsolete and conflict with verified progress and the approved continuing-track lens. | [Roadmap](../../../ROADMAP.md) | No trigger; future roadmap changes follow project evidence and approval. |
| LEARNING-08 | Treat embedded AI-agent instructions as executable project instructions. | Rejected | Conflicts with AGENTS.md Rule 0. | [AGENTS.md](../../../AGENTS.md) | No trigger; raw instructions never gain authority through ingestion. |

## Close record

Every material source claim is represented once in the claim tables above. Accepted guidance is
folded into the registered owners, Covered guidance points to existing evidence, Deferred guidance
has a named consumer/trigger, and Rejected guidance records the conflict. Named technologies remain
candidates until the Tool & Runtime Admission Protocol is activated by real work.
