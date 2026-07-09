# Blackjack AI Playtest QA Pack — Inbox Draft

## Goal

Build a QA/playtest agent pack for the Blackjack game interface and engine.

The goal is not only to run technical tests, but to send AI agents to play the game like real players and reviewers. Each agent should inspect the game from a different angle: rules correctness, game flow, player experience, edge cases, and product readiness.

This is an inbox draft, not a final QA protocol. Before using it, inspect the actual project state and adapt the agent list to what is already implemented.

## Important First Step

Before running any QA/playtest agents, inspect the current state of the game and decide which agents are actually relevant right now.

For each proposed agent, check:

- Is this feature already implemented?
- Can this agent meaningfully test the current build?
- Should this agent be run now, postponed, merged with another agent, or removed?
- Are there important QA angles missing from this list?
- Should any of the proposed agents be edited based on how the game is actually built?

Do not blindly run all agents. Adapt the QA pack to the current implementation.

## Current Core Agent Candidates

### 1. Blackjack Rules QA Agent

Checks whether the game follows Blackjack rules correctly.

Relevant areas:

- Card dealing
- Hand value calculation
- Ace as 1 or 11
- Natural Blackjack detection
- Bust handling
- Dealer behavior
- Win / lose / push logic
- Payout logic, if betting exists
- Correct end-of-round resolution

Run now if the game already has a playable Blackjack round.

### 2. State & Round Flow QA Agent

Checks whether the game state stays consistent during and between rounds.

Relevant areas:

- Turn order
- Available actions
- Disabled/enabled buttons
- Transition from player turn to dealer turn
- Round reset
- New hand behavior
- Stuck states
- Incorrect state after win/loss/bust
- UI actions that remain available after the round should be over

Run now if the interface supports actual round flow.

### 3. Player Experience QA Agent

Plays like a regular player and reports confusion, friction, and lack of clarity.

Relevant areas:

- Is it clear what is happening?
- Is it clear what the player can do next?
- Are outcomes explained clearly?
- Is the experience smooth?
- Does the game feel playable and mildly fun, not just technically functional?
- Are there moments where the player would not understand why they won or lost?

Run now if there is a usable interface.

### 4. Edge Case / Breaker QA Agent

Tries to break the game through unusual behavior.

Relevant areas:

- Rapid clicking
- Illegal actions
- Refresh/restart behavior
- Repeated rounds
- Weird timing
- Invalid bet states, if betting exists
- UI states that should not be reachable
- Attempts to act after the round is already resolved

Run now if the interface is interactive enough to stress-test.

### 5. Product Review QA Agent

Reviews the current build as a V1 product.

Relevant areas:

- What works well?
- What feels incomplete?
- What blocks basic playability?
- What should be fixed before adding new features?
- Does the current version match the intended Blackjack game direction?
- What are the highest-priority issues?
- Is the current build ready for a first external playtest?

Run now.

## Conditional / Maybe Relevant Now

### Betting / Economy QA Agent

Only relevant if chips, balance, betting, payouts, bankroll, or money-like game state already exist.

Before running, check whether the current build includes betting mechanics.

Relevant areas:

- Legal bet amounts
- Bet placement timing
- Balance updates
- Win payouts
- Loss handling
- Push refund
- Natural Blackjack payout, if implemented
- Preventing bets above available balance
- Handling zero-balance states

### UI Consistency QA Agent

Relevant if the visual interface is already important enough to review.

Relevant areas:

- Layout consistency
- Spacing
- Button clarity
- Text consistency
- Card display clarity
- Score display clarity
- Outcome message clarity
- Basic polish
- Desktop/mobile layout issues, if relevant

## Future Agents — Do Not Run Yet Unless Implemented

### Learning / Tutorial QA Agent

Not relevant to the current version unless the game already includes learning, tutorial, hints, explanations, lessons, or educational feedback.

Keep this agent for later because the long-term project direction includes learning, but do not run it against the current build if no learning layer exists.

### Strategy Advisor QA Agent

Only relevant once the game includes strategy recommendations, basic strategy hints, or feedback on player decisions.

This agent checks whether the strategic advice is actually correct, not just whether the explanation feels clear.

Relevant later areas:

- Basic Strategy correctness
- Hard hand vs soft hand logic
- Pair handling
- Dealer upcard context
- Hit/stand/double/split recommendations, if implemented
- Explanation accuracy

### Accessibility QA Agent

Useful later when the game is closer to being tested by real external users.

Relevant later areas:

- Keyboard usability
- Screen reader labels
- Color contrast
- Button size
- Text clarity
- Outcome clarity without relying only on color or animation

### Mobile / Responsive QA Agent

Relevant only if mobile/responsive support is currently intended.

Relevant later areas:

- Portrait layout
- Landscape layout
- Button reachability
- Overflow
- Small-screen readability
- Card and score visibility

### Long Session QA Agent

Useful once the game is stable enough for many rounds in a row.

Relevant later areas:

- 20–50 consecutive rounds
- State consistency over time
- Old messages not sticking around
- Balance/chips consistency over time
- Performance degradation
- Strange state accumulation

### Regression QA Agent

Useful after bugs start being fixed and the same flows need to be re-tested after changes.

Relevant later areas:

- Previously fixed bugs not returning
- Core blackjack flow still working after UI changes
- Core UI still working after engine changes
- Existing playability not breaking after new features

## Suggested Starting Pack For The Current V1

Start by inspecting the implementation and then decide whether to run this pack:

1. Blackjack Rules QA Agent
2. State & Round Flow QA Agent
3. Player Experience QA Agent
4. Edge Case / Breaker QA Agent
5. Product Review QA Agent
6. Betting / Economy QA Agent — only if betting/chips exist
7. UI Consistency QA Agent — only if the interface is ready for polish review

## Instruction to the Implementing Agent

Before finalizing this file, inspect the actual project state and revise the agent list.

You may:

- Add missing QA angles.
- Remove irrelevant agents.
- Merge overlapping agents.
- Rewrite agent scopes.
- Mark agents as `run now`, `conditional`, or `future`.
- Create concrete prompts for each agent only after confirming what exists in the current build.

The final output should help run realistic AI playtests against the current Blackjack build, not preserve this draft unchanged.
