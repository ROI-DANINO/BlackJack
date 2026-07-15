// Deterministic lesson state machine: drives explain -> question -> hand -> recap
// progression against a LearnEngine. It never parses raw JSON itself (that stays inside
// LearnEngine) and never reimplements totals/legality/dealer play/wager/outcomes — those
// are engine-owned, resolved through LearnEngine (describeHand for question rules;
// startArranged/startLive/startRound/legalActions/applyAction for hand steps).
//
// Hand steps run REAL blackjack: an arranged opening sits on a real ordered shoe, and the
// round is played out through the engine until `round.status === 'resolved'`. Learning
// correctness (did the learner perform the step's requestedAction?) and the hand's outcome
// (win/loss/push) are recorded as SEPARATE facts — a correct decision can still lose.

import type { Action, SessionState } from '../bridge/types';
import { BridgeError, CoreRuleError } from '../bridge/validate';
import { roundFeedback } from './feedback';
import type { LearnEngine } from './engine';
import type {
  Assistance, AttemptEngineContext, AttemptRecord, HandStep, LessonState, QuestionStep, Subject, Unit,
} from './types';

export interface LessonControllerOptions {
  /** Deterministic index picker (e.g. for choosing among named openings). */
  seq: () => number;
  /** Deterministic-per-call seed source for live (unarranged) hand steps. */
  freshSeed: () => string;
}

function initialState(subject: Subject, unit: Unit): LessonState {
  return {
    subject, unit, stepIndex: -1, step: null,
    session: null, legalActions: [], attempts: [],
    feedback: null, awaitingContinue: false, completed: false,
    busy: false, error: null, fatal: null,
  };
}

export class LessonController {
  private state: LessonState;
  private readonly listeners = new Set<() => void>();
  private locked = false; // true after an incorrect answer, until retry() is called
  private assistance: Assistance = 'none';
  // Index (in state.attempts) of the current hand step's graded decision, or null before
  // the first action of a hand step. One hand step records exactly one attempt.
  private handAttemptIndex: number | null = null;

  // `opts` (seq/freshSeed) is accepted to match the constructor contract shared with the
  // later hand-step task; the explain/question/recap progression built here does not need it.
  constructor(
    private readonly engine: LearnEngine,
    private readonly subject: Subject,
    private readonly unit: Unit,
    private readonly opts: LessonControllerOptions,
  ) {
    this.state = initialState(subject, unit);
  }

  getState = (): LessonState => this.state;

  subscribe = (fn: () => void): (() => void) => {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  };

  begin(): void {
    if (this.state.fatal || this.unit.steps.length === 0) return;
    const profileId = this.unit.profileId;
    if (profileId) {
      try {
        const probe = this.engine.startLiveForProfile(profileId, `lesson:${this.unit.id}:profile-probe`);
        const compatibility = this.engine.checkStrategyCompatibility(profileId, probe);
        if (compatibility !== 'compatible') {
          this.set({ fatal: this.profileGateFatal(profileId, compatibility), error: null });
          return;
        }
      } catch (e) {
        if (e instanceof BridgeError) { this.set({ fatal: e.message }); return; }
        if (e instanceof CoreRuleError) { this.set({ fatal: e.message }); return; }
        throw e;
      }
    }
    this.enterStep(0);
  }

  /** Advance past a step that only needs acknowledgement (explain/recap) or one just
   *  answered correctly. No-op while a question is unanswered or already at the last step. */
  continue(): void {
    if (this.state.fatal || !this.state.awaitingContinue) return;
    const nextIndex = this.state.stepIndex + 1;
    if (nextIndex >= this.unit.steps.length) return; // recap is the terminal step
    this.enterStep(nextIndex);
  }

  /** For a question step: select one of its declared choices (rejects an unknown value with a
   *  recoverable error). For a hand step: apply `value` as a player Action (must be legal). */
  choose(value: string): void {
    if (this.state.fatal) return;
    const step = this.state.step;
    if (!step) return;
    if (step.type === 'hand') {
      this.chooseAction(step, value as Action);
      return;
    }
    if (step.type !== 'question') return;
    if (!step.choices.some((c) => c.value === value)) {
      this.set({ error: `not a valid choice: ${value}` });
      return;
    }
    this.submitResponse(step, value);
  }

  /** Submit a response to the current question step directly (no choice-membership check). */
  answer(value: string): void {
    if (this.state.fatal) return;
    const step = this.state.step;
    if (!step || step.type !== 'question') return;
    this.submitResponse(step, value);
  }

  /** Unlock another attempt after an incorrect answer, escalating assistance. No-op unless
   *  the step is currently locked (i.e. the most recent answer on it was wrong). */
  retry(): void {
    if (this.state.fatal) return;
    if (!this.locked) return;
    this.assistance = this.assistance === 'none' ? 'retry' : 'instruction';
    this.locked = false;
    this.set({ feedback: null, error: null });
  }

  // --- internals ---

  private enterStep(index: number): void {
    const step = this.unit.steps[index]!;
    this.locked = false;
    this.assistance = 'none';
    this.handAttemptIndex = null;
    if (step.type === 'hand') {
      this.enterHandStep(index, step);
      return;
    }
    const awaitingContinue = step.type === 'explain' || step.type === 'recap';
    // Keep `session` intact: a later last_outcome question must read the log a prior hand step left.
    this.set({ stepIndex: index, step, feedback: null, error: null, awaitingContinue, legalActions: [] });
  }

  /** Deal a hand step's opening on a real shoe and hand control to the learner (or resolve
   *  immediately if the opening — e.g. a natural — settles on the deal). */
  private enterHandStep(index: number, step: HandStep): void {
    let session: SessionState;
    try {
      if (step.setup.kind === 'arranged') {
        const openings = step.setup.openings;
        const prefix = openings[this.opts.seq() % openings.length]!;
        const started = this.unit.profileId
          ? this.engine.startArrangedForProfile(this.unit.profileId, `lesson:${this.unit.id}:${step.id}`, prefix)
          : this.engine.startArranged(`lesson:${this.unit.id}:${step.id}`, prefix);
        session = this.engine.startRound(started);
      } else {
        const started = this.unit.profileId
          ? this.engine.startLiveForProfile(this.unit.profileId, this.opts.freshSeed())
          : this.engine.startLive(this.opts.freshSeed());
        session = this.engine.startRound(started);
      }
    } catch (e) {
      this.handleHandError(e, index, step);
      return;
    }
    this.set({ stepIndex: index, step, session, feedback: null, error: null, awaitingContinue: false, legalActions: [] });
    this.advanceHand(session, step);
  }

  /** Apply a legal player action to the in-progress hand step. The first action of the step
   *  is the graded decision (recorded once); later actions continue multi-action / split play. */
  private chooseAction(step: HandStep, action: Action): void {
    const round = this.state.session?.round;
    if (!round || round.status !== 'player_turn') return; // nothing to decide
    if (!this.state.legalActions.includes(action)) {
      this.set({ error: `not a legal action: ${action}` });
      return;
    }
    let session: SessionState;
    try {
      session = this.engine.applyAction(this.state.session!, action);
    } catch (e) {
      if (e instanceof BridgeError) { this.set({ fatal: e.message }); return; }
      if (e instanceof CoreRuleError) { this.set({ error: e.message }); return; }
      throw e;
    }
    if (this.handAttemptIndex === null) this.recordHandDecision(step, action, session);
    this.advanceHand(session, step);
  }

  /** After an action (or the initial deal), either finalize a resolved hand or re-read the
   *  engine's legal actions and wait for the next decision. Legality stays engine-owned. */
  private advanceHand(session: SessionState, step: HandStep): void {
    if (session.round?.status === 'resolved') {
      this.finalizeHand(session, step);
      return;
    }
    let legalActions: Action[];
    try {
      legalActions = this.engine.legalActions(session);
    } catch (e) {
      if (e instanceof BridgeError) { this.set({ fatal: e.message }); return; }
      if (e instanceof CoreRuleError) { this.set({ error: e.message }); return; }
      throw e;
    }
    this.set({ session, legalActions });
  }

  /** Record the graded decision. `correct` reflects whether the learner performed the step's
   *  requestedAction — NOT whether the hand won. A requested-action step records assistance
   *  'instruction'; a live step (no requestedAction) is play, not graded (correct = null). */
  private recordHandDecision(step: HandStep, action: Action, session: SessionState): void {
    const graded = step.requestedAction != null;
    const attempt: AttemptRecord = {
      subjectId: this.subject.id, unitId: this.unit.id, stepId: step.id, outcomeId: step.outcomeId,
      interaction: 'hand', prompt: step.intro, response: action,
      correct: graded ? action === step.requestedAction : null,
      assistance: graded ? 'instruction' : 'none',
      engine: this.engineContext(session), feedback: step.teach,
    };
    this.handAttemptIndex = this.state.attempts.length;
    this.set({ attempts: [...this.state.attempts, attempt] });
  }

  /** Resolve the hand: derive outcome feedback from the round log plus the step's teaching copy,
   *  and attach the resolved outcomes to the decision attempt (or record an ungraded play attempt
   *  if the opening settled with no decision, e.g. a natural). */
  private finalizeHand(session: SessionState, step: HandStep): void {
    const r = session.round!;
    const outcomes = session.logs.at(-1)!.outcomes;
    const feedback = [...roundFeedback(r.hands, outcomes, r.dealer.cards), step.teach].join('\n');
    let attempts = this.state.attempts;
    if (this.handAttemptIndex === null) {
      // No decision was made (the opening resolved on the deal). Record an ungraded play attempt.
      const attempt: AttemptRecord = {
        subjectId: this.subject.id, unitId: this.unit.id, stepId: step.id, outcomeId: step.outcomeId,
        interaction: 'hand', prompt: step.intro, response: '', correct: null,
        assistance: 'none', engine: this.engineContext(session), feedback: step.teach,
      };
      this.handAttemptIndex = attempts.length;
      attempts = [...attempts, attempt];
    } else {
      const decisionIndex = this.handAttemptIndex;
      attempts = attempts.map((a, i) =>
        i === decisionIndex && a.engine ? { ...a, engine: { ...a.engine, outcomes } } : a);
    }
    this.set({
      session, attempts, feedback, awaitingContinue: true, legalActions: [], error: null,
      completed: this.computeCompleted(attempts),
    });
  }

  /** Snapshot the engine facts for an attempt: card ids, dealer upcard, the legal set the
   *  learner chose from, resolved outcomes (empty until the round resolves), and the wager. */
  private engineContext(session: SessionState): AttemptEngineContext {
    const r = session.round;
    const log = session.logs.at(-1);
    return {
      seed: session.seed,
      playerCardIds: r ? r.hands.flatMap((h) => h.cards.map((c) => c.card_id)) : [],
      dealerUpcardId: r?.dealer.cards[0]?.card_id ?? null,
      legalActions: this.state.legalActions,
      outcomes: log?.outcomes ?? [],
      wager: r?.bet ?? null,
    };
  }

  /** A malformed reply during hand setup is fatal; a core rejection is recoverable. */
  private handleHandError(e: unknown, index: number, step: HandStep): void {
    if (e instanceof BridgeError) { this.set({ stepIndex: index, step, fatal: e.message }); return; }
    if (e instanceof CoreRuleError) {
      this.set({ stepIndex: index, step, error: e.message, awaitingContinue: false, legalActions: [], session: null });
      return;
    }
    throw e;
  }

  private submitResponse(step: QuestionStep, response: string): void {
    if (this.state.awaitingContinue) return; // already correctly answered — ignore duplicates
    if (this.locked) return;                 // wrong answer pending retry()

    let correct: boolean;
    try {
      correct = this.resolveAnswer(step, response);
    } catch (e) {
      if (e instanceof BridgeError) { this.set({ fatal: e.message }); return; }
      if (e instanceof CoreRuleError) { this.set({ error: e.message }); return; }
      throw e;
    }

    const attempt: AttemptRecord = {
      subjectId: this.subject.id, unitId: this.unit.id, stepId: step.id, outcomeId: step.outcomeId,
      interaction: 'question', prompt: step.prompt, response, correct,
      // Question steps evaluate a fixed rule against stateless engine facts (or the stored
      // session/log) — there is no live hand session to attach here. Hand steps (a later
      // task) are what populate AttemptEngineContext.
      assistance: this.assistance, engine: null,
      feedback: correct ? step.correct : step.incorrect,
    };
    const attempts = [...this.state.attempts, attempt];

    if (correct) {
      this.locked = false;
      this.set({
        attempts, feedback: attempt.feedback, awaitingContinue: true, error: null,
        completed: this.computeCompleted(attempts),
      });
    } else {
      this.locked = true;
      this.set({ attempts, feedback: attempt.feedback, awaitingContinue: false, error: null });
    }
  }

  /** Resolve one AnswerRule kind. `literal` compares directly; `hand_*` kinds ask the
   *  engine to score the rule's fixed cards (never regraded in TypeScript); `last_*`
   *  kinds read the most recent round log off the stored session — always false until a
   *  hand step (a later task) populates `state.session`.
   *
   *  Response string conventions authored content must match:
   *  - hand_total: `String(best_total)`, e.g. '17'
   *  - hand_softness: 'soft' | 'hard'
   *  - hand_bust: 'bust' | 'not_bust'
   *  - last_outcome: the OutcomeResult literal ('win' | 'loss' | 'push' | 'blackjack')
   *  - last_wager / last_bankroll_delta / last_hand_count: `String(<number>)` */
  private resolveAnswer(step: QuestionStep, response: string): boolean {
    const rule = step.answer;
    switch (rule.kind) {
      case 'literal':
        return response === rule.value;
      case 'hand_total':
        return response === String(this.engine.describeHand(rule.cards).best_total);
      case 'hand_softness':
        return response === (this.engine.describeHand(rule.cards).is_soft ? 'soft' : 'hard');
      case 'hand_bust':
        return response === (this.engine.describeHand(rule.cards).is_bust ? 'bust' : 'not_bust');
      case 'last_outcome': {
        const outcome = this.lastLog()?.outcomes[rule.handIndex];
        return outcome != null && response === outcome.result;
      }
      case 'last_wager': {
        const outcome = this.lastLog()?.outcomes[rule.handIndex];
        return outcome != null && response === String(outcome.wager);
      }
      case 'last_bankroll_delta': {
        const log = this.lastLog();
        return log != null && response === String(log.bankroll_delta);
      }
      case 'last_hand_count': {
        const log = this.lastLog();
        return log != null && response === String(log.outcomes.length);
      }
    }
  }

  private lastLog() {
    const logs = this.state.session?.logs;
    return logs && logs.length > 0 ? logs[logs.length - 1] : undefined;
  }

  private computeCompleted(attempts: AttemptRecord[]): boolean {
    return this.unit.requiredChecks.every((id) => attempts.some((a) => a.stepId === id && a.correct === true));
  }

  private profileGateFatal(profileId: string, compatibility: 'profile_mismatch' | 'unsupported_ruleset'): string {
    if (compatibility === 'profile_mismatch') {
      return `strategy profile mismatch: lesson ${profileId} does not match the active session`;
    }
    return `strategy profile unsupported: lesson ${profileId} requires a verified canonical ruleset`;
  }

  private set(patch: Partial<LessonState>): void {
    this.state = { ...this.state, ...patch };
    this.emit();
  }

  private emit(): void {
    for (const l of this.listeners) l();
  }
}
