import type { Action, HandOutcome, PresetCard, SessionState } from '../bridge/types';

/** Produces an opening prefix; `seq` varies the cards across repetitions. */
export type SituationBuilder = (seq: number) => PresetCard[];

/**
 * One guided teaching moment. The prefix sets up an OPENING (e.g. a pair, an eleven,
 * a natural blackjack); the hand then resolves for real. `hint` is optional gentle
 * guidance; when omitted the learner freely chooses from the legal actions.
 */
export type Situation = {
  id: string;
  topic: string;
  intro: string;
  build: SituationBuilder;
  hint?: Action; // if set, the UI highlights this action but does not force it
  teach: string;
};

export type LiveConfig = { intro: string; minHands: number; maxHands: number };

export type DrillUnit = {
  id: string;
  title: string;
  goal: string;
  situations: Situation[];
  live: LiveConfig;
};

export type DrillPhase = 'situation' | 'live_intro' | 'live' | 'recap';

/** One in-memory record per resolved decision context, kept only for the recap. */
export type DrillDecisionRecord = {
  phase: 'situation' | 'live';
  unitId: string;
  topic: string;
  situationId: string | null;
  playerCardIds: string[];
  dealerUpcardId: string | null;
  legalActions: Action[];
  actionsTaken: Action[];
  outcomes: HandOutcome[];
  feedback: string[];
};

export type DrillState = {
  phase: DrillPhase;
  unit: DrillUnit;
  situationIndex: number;
  session: SessionState | null;
  legalActions: Action[];
  hint: Action | null;
  prompt: string | null;
  feedback: string[];
  awaitingContinue: boolean;
  liveHandsPlayed: number;
  records: DrillDecisionRecord[];
  error: string | null;
  fatal: string | null;
  busy: boolean;
};
