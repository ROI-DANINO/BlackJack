// Wire format mirrors crates/blackjack-core serde output EXACTLY (verbatim snake_case).
// Guarded by contract.test.ts against Rust golden fixtures. Do NOT rename to camelCase.

export type Rank =
  | 'ace' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven'
  | 'eight' | 'nine' | 'ten' | 'jack' | 'queen' | 'king';
export type Suit = 'clubs' | 'diamonds' | 'hearts' | 'spades';
export interface Card { card_id: string; deck_id: string; rank: Rank; suit: Suit }
export type PresetCard = { rank: Rank; suit: Suit };
export interface HandFacts {
  hard_total: number;
  best_total: number;
  is_soft: boolean;
  is_bust: boolean;
}

export type DealerSoft17 = 'hit' | 'stand';
export interface Ruleset {
  id: string;
  decks: number;
  penetration_percent: number;
  dealer_soft_17: DealerSoft17;
  blackjack_payout: number;
  max_split_hands: number;
  double_after_split: boolean;
  resplit_aces: boolean;
  split_aces_receive_one_card: boolean;
  insurance_auto_decline: boolean;
}

export type Action = 'hit' | 'stand' | 'double' | 'split';
export type StrategyProfileId = 'h17' | 's17';
export type StrategyCompatibility = 'compatible' | 'profile_mismatch' | 'unsupported_ruleset';
export type HandSource = 'initial' | 'split';
export interface HandState {
  cards: Card[]; wager: number; is_complete: boolean; is_doubled: boolean; source: HandSource;
}
export interface DealerState { cards: Card[] }
export type RoundStatus = 'player_turn' | 'dealer_turn' | 'resolved';
export type LoggedAction = 'hit' | 'stand' | 'double' | 'split' | 'insurance_declined';
export interface ActionLog { action: LoggedAction; hand_index: number; card_id: string | null }
export type OutcomeResult = 'win' | 'loss' | 'push' | 'blackjack';
export interface HandOutcome { hand_index: number; result: OutcomeResult; wager: number; delta: number }

export interface RoundState {
  status: RoundStatus;
  bet: number;
  active_hand_index: number;
  dealer: DealerState;
  hands: HandState[];
  dealt_cards: Card[];
  actions: ActionLog[];
  bankroll_before: number;
}
export interface ShoeState {
  seed: string; shoe_number: number; cards: Card[]; cursor: number;
  discard: Card[]; penetration_index: number;
}
export interface RoundLog {
  seed: string; ruleset: Ruleset; shoe_number: number;
  dealt_cards: Card[]; actions: ActionLog[]; outcomes: HandOutcome[];
  bankroll_before: number; bankroll_after: number; bankroll_delta: number;
  penetration_reached: boolean;
}
export interface SessionState {
  seed: string; ruleset: Ruleset; shoe: ShoeState;
  bankroll: number; default_bet: number;
  round: RoundState | null; logs: RoundLog[];
}

// Client-produced commands. Internally tagged on "command".
export type CoreCommand =
  | { command: 'start_session'; seed: string; bankroll: number; default_bet: number; ruleset: Ruleset | null }
  | {
      command: 'start_session_with_prefix';
      seed: string;
      bankroll: number;
      default_bet: number;
      ruleset: Ruleset | null;
      prefix: PresetCard[];
    }
  | { command: 'start_round'; session: SessionState; bet: number | null }
  | { command: 'legal_actions'; session: SessionState }
  | { command: 'apply_action'; session: SessionState; action: Action }
  | { command: 'reshuffle'; session: SessionState }
  | { command: 'describe_hand'; cards: PresetCard[] }
  | { command: 'check_strategy_compatibility'; profile_id: StrategyProfileId; session: SessionState };

// Core-produced responses. Adjacently tagged on "type"/"data".
export type CoreResponse =
  | { type: 'session'; data: SessionState }
  | { type: 'actions'; data: Action[] }
  | { type: 'hand_facts'; data: HandFacts }
  | { type: 'strategy_compatibility'; data: StrategyCompatibility };

// Envelope produced by dispatch_json / CliOutput.
export type CliOutput =
  | { status: 'ok'; response: CoreResponse }
  | { status: 'error'; message: string };
