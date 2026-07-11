// Deterministic knowledge-step state machine: drives explain -> question -> recap
// progression against a LearnEngine. It never parses raw JSON itself (that stays inside
// LearnEngine) and never reimplements totals/legality/outcomes — engine-owned answer
// rules are always resolved through LearnEngine.describeHand.
//
// Scope note: live/arranged hand-step play (`type: 'hand'` steps) is a later task. This
// controller advances through explain/question/recap steps only; landing on a hand step
// records a recoverable error rather than guessing at gameplay it doesn't own yet.

import { BridgeError, CoreRuleError } from '../bridge/validate';
import type { LearnEngine } from './engine';
import type { Assistance, AttemptRecord, LessonState, QuestionStep, Subject, Unit } from './types';

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

  /** Select one of the current question step's declared choices. Rejects (recoverable
   *  error, no attempt recorded) a value that is not one of `step.choices`. */
  choose(value: string): void {
    const step = this.state.step;
    if (!step || step.type !== 'question') return;
    if (!step.choices.some((c) => c.value === value)) {
      this.set({ error: `not a valid choice: ${value}` });
      return;
    }
    this.submitResponse(step, value);
  }

  /** Submit a response to the current question step directly (no choice-membership check). */
  answer(value: string): void {
    const step = this.state.step;
    if (!step || step.type !== 'question') return;
    this.submitResponse(step, value);
  }

  /** Unlock another attempt after an incorrect answer, escalating assistance. No-op unless
   *  the step is currently locked (i.e. the most recent answer on it was wrong). */
  retry(): void {
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
    if (step.type === 'hand') {
      // Hand steps are dealt by a later task; block rather than fake play here.
      this.set({
        stepIndex: index, step, feedback: null, awaitingContinue: false, legalActions: [],
        error: 'hand steps are not yet supported',
      });
      return;
    }
    const awaitingContinue = step.type === 'explain' || step.type === 'recap';
    this.set({ stepIndex: index, step, feedback: null, error: null, awaitingContinue, legalActions: [] });
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

  private set(patch: Partial<LessonState>): void {
    this.state = { ...this.state, ...patch };
    this.emit();
  }

  private emit(): void {
    for (const l of this.listeners) l();
  }
}
