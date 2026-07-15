# V2 Scalability & Cloud Architecture Strategy

## 1. The "Vibe Coding" Cloud Dilemma & Our Unfair Advantage
**The Problem:** AI coding agents excel at building "happy path" local applications but often introduce severe security vulnerabilities, poor session management, and unscalable resource usage when tasked with building custom backends from scratch (e.g., custom Express/Node.js servers).

**The Advantage (Client-Side Compute):** Because the core engine is written in Rust and compiled to WebAssembly (WASM), the heavy lifting (simulation, math, rules validation) runs locally on the user's device. 
* **Result:** Compute is essentially free. The cloud infrastructure acts purely as a lightweight state-synchronization layer rather than a game server, keeping costs near zero even at scale.

## 2. Phase 1: Single-Player Cloud (Profiles & Leaderboards)
**Goal:** Introduce user profiles, progress tracking, streaks, and leaderboards.
**Architecture:** Serverless Backend-as-a-Service (BaaS).
* **Avoid Custom Servers:** Do not use AI to write custom backend infrastructure. 
* **Tech Stack:** Use **Supabase** (or Firebase).
* **Security:** Leverage built-in Authentication and Row Level Security (RLS) policies. The `LearningController` acts as a dumb client, pushing JSON state updates to a secure, managed database.

## 3. Phase 2: True Multiplayer (Future Horizon)
**Goal:** Allow friends to play at the same table (Free Play).
**Architecture:** Authoritative Server.
* **The Shift:** In a multiplayer environment, **the client can no longer be trusted**. We cannot rely on local WASM to dictate game state, as malicious users could alter local memory.
* **Implementation:** The exact same Rust engine currently compiled to WASM will be deployed on a dedicated server. The server holds the deck and orchestrates the game loop, streaming state to connected clients via WebSockets/WebRTC.

## 4. Architectural Blindspots & Mitigation
1.  **The "Trust the Client" Leaderboard Hack:**
    * *Risk:* A user alters the local API call to send `score = 9999999` to Supabase.
    * *Mitigation:* Do not accept raw score updates. The client must submit the `round_log` to an Edge Function, which runs a quick validation against the rules engine before committing the score to the database.
2.  **Offline-First & State Desync:**
    * *Risk:* WASM works instantly offline. If a user loses connection, local progress outpaces cloud state.
    * *Mitigation:* Implement a robust Sync Manager queue. Local timestamps record achievements, and the queue syncs with conflict resolution once the network is restored.
3.  **Memory Scraping (Seed Exposure):**
    * *Risk:* Currently, the deterministic `Seed` generates the shoe in local memory. A technical user could read the memory to know the dealer's next cards.
    * *Mitigation (For Tournaments/Multiplayer):* The server must hold the shoe. The local WASM engine only receives cards as they are dealt.
4.  **Over-The-Air (OTA) Update Bloat:**
    * *Risk:* Using EAS Updates in Expo pushing massive payloads because a tiny Rust change forces a complete WASM binary recompile.
    * *Mitigation:* Separate the WASM binary from regular JS/UI updates, or establish strict caching and chunking strategies.
5.  **AI Agent Boundaries:**
    * *Risk:* AI agents might try to tightly couple database fetch calls directly inside React components or the `LearningController`.
    * *Mitigation:* Force agents to use an isolated `SyncManager` class that handles all Supabase interactions, keeping the UI and Learning logic completely agnostic of the cloud provider.
