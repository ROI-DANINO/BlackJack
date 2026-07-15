// Serializable curriculum contracts for the blackjack-basics learning foundation.
// Consumes bridge types (Action, HandOutcome, PresetCard, SessionState) — never redefines them.

import type { Action, HandOutcome, PresetCard, SessionState, StrategyProfileId } from '../bridge/types';

export type Skill = { id: string; title: string };
export type Choice = { value: string; label: string };
export type AnswerRule =
  | { kind: 'literal'; value: string }
  | { kind: 'hand_total'; cards: PresetCard[] }
  | { kind: 'hand_softness'; cards: PresetCard[] }
  | { kind: 'hand_bust'; cards: PresetCard[] }
  | { kind: 'last_outcome'; handIndex: number }
  | { kind: 'last_wager'; handIndex: number }
  | { kind: 'last_bankroll_delta' }
  | { kind: 'last_hand_count' };

export type ExplainStep = { id: string; type: 'explain'; title: string; body: string; cards?: PresetCard[] };
export type QuestionStep = {
  id: string; type: 'question'; outcomeId: string; prompt: string; choices: Choice[];
  answer: AnswerRule; correct: string; incorrect: string;
};
export type HandStep = {
  id: string; type: 'hand'; outcomeId: string; title: string; intro: string;
  setup: { kind: 'arranged'; openings: PresetCard[][] } | { kind: 'live' };
  requestedAction?: Action; teach: string;
};
export type RecapStep = {
  id: string; type: 'recap'; title: string;
  capabilities: Array<{ outcomeId: string; text: string }>;
};
export type LessonStep = ExplainStep | QuestionStep | HandStep | RecapStep;

export type Unit = {
  id: string; title: string; goal: string; prerequisites: string[]; outcomes: string[];
  requiredChecks: string[]; steps: LessonStep[]; profileId?: StrategyProfileId;
};
export type Subject = { id: string; title: string; skills: Skill[]; units: Unit[] };

export type Assistance = 'none' | 'retry' | 'instruction';
export type AttemptEngineContext = {
  seed: string; playerCardIds: string[]; dealerUpcardId: string | null;
  legalActions: Action[]; outcomes: HandOutcome[]; wager: number | null;
};
export type AttemptRecord = {
  subjectId: string; unitId: string; stepId: string; outcomeId: string;
  interaction: LessonStep['type']; prompt: string; response: string; correct: boolean | null;
  assistance: Assistance; engine: AttemptEngineContext | null; feedback: string;
};
export type LessonState = {
  subject: Subject; unit: Unit; stepIndex: number; step: LessonStep | null;
  session: SessionState | null; legalActions: Action[]; attempts: AttemptRecord[];
  feedback: string | null; awaitingContinue: boolean; completed: boolean;
  busy: boolean; error: string | null; fatal: string | null;
};
