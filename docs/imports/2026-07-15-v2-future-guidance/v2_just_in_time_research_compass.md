# V2 Just-In-Time Research Compass

## Philosophy: Avoid Analysis Paralysis
Do not research all these topics upfront. This document maps identified "blindspots" to their natural development phases. Tackle each research topic only when the project reaches that specific milestone.

---

## Phase 1: App Shell & UI Implementation 
*When to research: As soon as you start building Expo components and defining the design system (Tamagui/NativeWind).*

### 1. Color Accessibility & Visual Feedback
* **The Risk:** Building a gamified app relying solely on red/green colors for success/failure will exclude ~8% of the male demographic (color blindness).
* **What to Research:** Look into accessible UI patterns for gamification. Ensure your design system enforces shape or motion feedback (e.g., screen shake, checkmarks/X icons) alongside color changes.

---

## Phase 2: Learning State Machine Development
*When to research: While building the `LearningController` and connecting it to the Rust game engine, before finalizing mobile deployment.*

### 2. App Lifecycle & Persistence (AsyncStorage)
* **The Risk:** Mobile OS aggressively kills background apps. If a user answers a text message mid-lesson, the RAM is cleared, and local WASM state is lost.
* **What to Research:** Research how to efficiently serialize the `LearningController` state and `GameController` session into local storage on every move, and how to hydrate the WASM engine from storage on app resume.

### 3. QA Harness for Gamified UX
* **The Risk:** The current `breakit` adversarial harness brilliantly tests the core game rules, but cannot test UI pacing, lesson flow, or feedback states.
* **What to Research:** Investigate how to mock the Rust engine to exclusively test the `LearningController` state transitions, or how to expand the current QA suite to simulate "learning paths" rather than just hands of blackjack.

---

## Phase 3: Content Scaling & Production
*When to research: After the UI works perfectly with 1-2 dummy lessons, right before you start writing the actual curriculum.*

### 4. Curriculum Delivery (Separating Content from Code)
* **The Risk:** Hardcoding lesson text ("Always split 8s because...") into React components means every typo fix requires an app compile and OTA update.
* **What to Research:** Design a strict JSON or Markdown schema for "Blackjack Lessons". Research how to fetch these payload files remotely so you (or AI agents) can author new content via an Admin panel without touching the codebase.

---

## Phase 4: Pre-Release & Beta Testing
*When to research: When the app is feature-complete and you are preparing to hand it to external testers.*

### 5. "Silent" Telemetry & Event Batching
* **The Risk:** Because the simulation is 100% local, you are blind to where users fail or drop off. Adding raw API calls to every button press will throttle the network and ruin the native feel.
* **What to Research:** Research lightweight event-batching patterns. Learn how to log UX events (e.g., "failed Hard 16 drill 3 times") into an in-memory queue, and silently post them to your analytics server only at the end of a session or lesson.
