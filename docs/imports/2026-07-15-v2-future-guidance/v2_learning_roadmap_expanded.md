# V2 Learning & Gamification Vision & Roadmap

## 1. Founder Intent & Core Vision
**Core Concept:** "I am creating an app that is like Duolingo but for learning to play Blackjack, and I want to make a shell UI."
**Target Platforms:** "Web first, then mobile application."

**The Goal:** Transform the blackjack simulation into a highly engaging, structured learning experience. It must feel like a premium, native gamified app (like Duolingo or Brilliant) with a persistent App Shell, rather than a standard web page.

**Core Loop:** Micro-interactions -> Immediate Feedback -> Targeted Repetition -> Mastery Update.

## 2. Strategic Conclusions from Planning Sessions
1.  **Infrastructure First, UI Later:** Do not build React components until the WebAssembly (WASM) integration is proven inside the Expo/Metro bundler environment. 
2.  **Define UX Mechanisms Before Coding:** The frontend must act purely as a reflection of a rigidly defined State Machine. Building UI components "on the fly" without a defined state machine will lead to conflicts with the deterministic Rust core.
3.  **Headless Learning Controller:** We need an intermediary layer (`LearningController`) between the Rust `GameController` and the React UI. This controller dictates the pace of the lesson, queues exercises, and evaluates user decisions independently of the game outcomes.

## 3. System Architecture Constraints
Maintaining the strict separation of concerns established in V1:
* **Rust Core:** Owns the rules, deck, math, and basic strategy oracle. Completely decoupled from UI.
* **WASM Bridge:** Exposes the engine to the frontend.
* **Learning Controller (TypeScript):** Manages the learning state, exercise sequencing, and feedback timing.
* **Expo App Shell (React):** Owns the presentation layer, animations, routing, and user progress display. Must use a single codebase for Web and Mobile.

## 4. Tactical Roadmap

### Phase 1: Infrastructure POC (Critical Path)
* Initialize Expo template with TypeScript.
* Successfully import, configure, and execute the existing `blackjack-core` WASM inside Metro/Expo for the Web target.
* *Do not proceed to UI until `startSession` and `act` commands return deterministic JSON payloads without bundler errors.*

### Phase 2: Headless Learning Controller
* Map the learning State Machine (`PathSelection`, `ActivePrompt`, `Feedback`, `ProgressUpdate`).
* Build the `LearningController` logic in TypeScript.
* Write tests to verify state transitions (Prompt -> Feedback -> Mastery) without touching React components.

### Phase 3: App Shell & Routing (Duolingo Style)
* Implement Expo Router.
* **Navigation State:** Create the `_layout.tsx` for the persistent Top App Bar (Stats/Lives) and Bottom Navigation Bar.
* **Active Lesson State:** Implement full-screen modal routing for active lessons to hide the shell completely to prevent distractions.

### Phase 4: Visual Polish & Gamification
* Integrate a Design System (e.g., Tamagui or NativeWind) for cross-platform consistency.
* Integrate State Management (Zustand) to sync the `LearningController` with the UI.
* Add micro-interactions, sound effects, and animations (Rive / Lottie) for card dealing and feedback loops.

## 5. AI Agent Instructions (Vibe Coding Context)
When reading this document to execute tasks:
* **Respect the Stack Boundaries:** Do not recreate blackjack logic, rules, or strategy in TypeScript. The Rust core is the single source of truth.
* **Strict Phasing:** Do not write UI components or CSS if tasked with Phase 1 or Phase 2. Focus purely on data flow, WASM compilation, and headless state management.
* **Component Design:** When building UI, prioritize unstyled, accessible, and highly modular components that react to the `LearningController` state. Avoid local UI state for anything that affects the learning path or game outcome.
