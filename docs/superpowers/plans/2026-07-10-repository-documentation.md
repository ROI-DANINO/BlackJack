# Repository Documentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give players and contributors concise, accurate entry-point documentation for the Blackjack trainer.

**Architecture:** A root README routes the two audiences to focused documents. CONTRIBUTING records the local workflow and quality expectations; the architecture page records the durable ownership and data-flow boundaries. Existing product, roadmap, specification, and QA documents remain authoritative and are linked rather than copied.

**Tech Stack:** Markdown, Cargo/Rust, Vite/React/TypeScript, WebAssembly.

## Global Constraints

- The product is a blackjack training app, not gambling software.
- Rust owns simulator rules and ordered-shoe card flow; UI code must not derive rules.
- Browser commands require a present, fresh, generated WASM artifact.
- Commands state their working directory.
- Existing records are linked rather than duplicated.

---

### Task 1: Add the public project README

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: `ROADMAP.md`, `docs/specs/product-vision.md`, `CONTRIBUTING.md`, `docs/architecture.md`
- Produces: a player and evaluator entry point

- [x] **Step 1: Write the page**

Create `README.md` with sections for the product, current capabilities, quick start, current rules, documentation, and project status. Describe Free Play as browser-playable and make the training-not-gambling boundary clear. Name the 6-deck H17/DAS/no-surrender/peek ruleset, 3:2 blackjack payout, and 75% penetration. Explain that ordered shoes and traceable card origins are deliberate properties. Include this quick start:

```bash
cd web
npm install
npm run build:wasm
npm run dev
```

Link to `CONTRIBUTING.md`, `docs/architecture.md`, `ROADMAP.md`, `docs/specs/product-vision.md`, `docs/specs/stack-boundaries.md`, and `docs/specs/qa-playtest-process.md`.

- [x] **Step 2: Check README links**

Run: `rg -o '\]\([^)]*\)' README.md`

Expected: only the planned local documentation links appear.

### Task 2: Add contributor workflow guidance

**Files:**
- Create: `CONTRIBUTING.md`

**Interfaces:**
- Consumes: `Cargo.toml`, `web/package.json`, `web/scripts/build-wasm.sh`, `web/scripts/check-wasm-fresh.sh`, `docs/specs/qa-playtest-process.md`
- Produces: the canonical setup, verification, and QA guide

- [x] **Step 1: Write the page**

State prerequisites: Rust with `wasm32-unknown-unknown`, a matching wasm-bindgen CLI, Node 20+, and npm. Show setup and verification commands with their working directories. Explain that the generated bridge artifact is ignored and that `dev`, `test`, and `build` reject a missing or stale version; the repair is `npm run build:wasm` from `web/`. Include core tests, format, clippy, web test, web build, and `npm run qa`. Require scoped feature QA and a `journal/qa/` ledger entry, then link to `docs/architecture.md` for boundary work.

- [x] **Step 2: Check named web scripts**

Run: `node -e "const p=require('./web/package.json'); for (const s of ['build:wasm','dev','test','build','qa']) if (!p.scripts[s]) process.exit(1)"`

Expected: exit status 0.

### Task 3: Add concise architecture documentation

**Files:**
- Create: `docs/architecture.md`

**Interfaces:**
- Consumes: `docs/specs/stack-boundaries.md`, `crates/blackjack-core/src/wasm.rs`, `web/src/bridge/core-client.ts`, `data/history/README.md`
- Produces: the technical ownership and data-flow reference

- [x] **Step 1: Write the page**

Include this map:

```text
React UI → TypeScript game/controller layer → WASM JSON bridge → Rust blackjack-core
                                                   ↓
                                         local JSONL history export
```

Explain Rust ownership (cards, ordered shoes, rules, round flow, settlement, logs, strategy oracle), TypeScript/React ownership (display and interaction only), the JSON bridge, Python's research/data role, V1 in-memory state, and local JSONL history. State that display code may neither fabricate cards nor derive rules; every dealt card comes from the ordered shoe with a traceable identity. Link to `docs/specs/stack-boundaries.md`.

- [x] **Step 2: Check implementation references**

Run: `test -f crates/blackjack-core/src/wasm.rs && test -f web/src/bridge/core-client.ts && test -f data/history/README.md`

Expected: exit status 0.

### Task 4: Verify and publish the documentation set

**Files:**
- Verify: `README.md`, `CONTRIBUTING.md`, `docs/architecture.md`

**Interfaces:**
- Consumes: all documents from Tasks 1–3
- Produces: a link-valid documentation change ready to push

- [x] **Step 1: Verify local Markdown links**

Run: `node -e "const fs=require('fs'); for (const f of ['README.md','CONTRIBUTING.md','docs/architecture.md']) { const d=fs.readFileSync(f,'utf8'), b=require('path').dirname(f); for (const m of d.matchAll(/\[[^\]]+\]\(([^)#]+)(?:#[^)]+)?\)/g)) { const t=m[1]; if (!/^[a-z]+:/.test(t) && !fs.existsSync(require('path').resolve(b,t))) throw new Error(f+': '+t); }}"`

Expected: exit status 0.

- [x] **Step 2: Run verification**

Run: `cargo test -p blackjack-core && (cd web && npm test && npm run build)`

Expected: core tests, web tests, and production build pass. If the freshness guard reports a missing or stale artifact, run `(cd web && npm run build:wasm)` and rerun this command.

- [x] **Step 3: Review, commit, and push**

Run: `git diff --check && git diff -- README.md CONTRIBUTING.md docs/architecture.md`

Expected: no whitespace errors and only planned documentation changes.

Commit the three documentation files and this plan with message `docs: add project and contributor guides`, then run `git push origin HEAD`.

- [x] **Step 4: Close the session**

Run `$codex-end` after the push to write the required session handoff and reconcile project records.
