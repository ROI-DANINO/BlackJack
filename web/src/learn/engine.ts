// Synchronous typed adapter over the Task 2 bridge. This is the only file under
// web/src/learn that touches raw JSON, CoreCommand, or CoreResponse shapes — the
// curriculum and controller layers only ever see typed data (e.g. HandFacts,
// SessionState, Action[]).
//
// Every method dispatches through the same private `call`: a core-rejected command
// (e.g. an illegal action) surfaces as a recoverable CoreRuleError, while a malformed
// or wrong-typed reply stays fatal (BridgeError). All blackjack rules — legality,
// totals, dealer play, wager, and outcome — live in the engine; this adapter never
// computes or grades them.

import type { CoreTransport } from '../bridge/transport';
import type {
  Action, CoreCommand, CoreResponse, HandFacts, PresetCard, Ruleset, SessionState,
  StrategyCompatibility, StrategyProfileId,
} from '../bridge/types';
import { BridgeError, CoreRuleError, parseCliOutput } from '../bridge/validate';

// Teaching-session constants, matching Free Play / drill sessions (web/src/breakit-hook.ts:16-17).
const BANKROLL = 100000; // cents
const DEFAULT_BET = 2000; // cents

// These are the only explicit-ruleset teaching sessions this adapter can create. The
// curriculum declares a profile literal; Rust owns verifying that a returned session really
// matches it. This is intentionally not a general rules engine or a ruleset-to-profile mapper.
const H17_RULESET: Ruleset = {
  id: 'v1-modern-classic-h17-6d', decks: 6, penetration_percent: 75,
  dealer_soft_17: 'hit', blackjack_payout: 1.5, max_split_hands: 4,
  double_after_split: true, resplit_aces: false, split_aces_receive_one_card: true,
  insurance_auto_decline: true,
};
const S17_RULESET: Ruleset = {
  ...H17_RULESET, id: 'v1-modern-classic-s17-6d', dealer_soft_17: 'stand',
};

function canonicalRuleset(profileId: StrategyProfileId): Ruleset {
  switch (profileId) {
    case 'h17': return H17_RULESET;
    case 's17': return S17_RULESET;
  }
}

export class LearnEngine {
  constructor(private readonly transport: CoreTransport) {}

  describeHand(cards: PresetCard[]): HandFacts {
    const out = this.call({ command: 'describe_hand', cards });
    if (out.type !== 'hand_facts') throw new BridgeError(`expected hand_facts, got ${out.type}`);
    return out.data;
  }

  /** Start a session whose shoe has `prefix` arranged on top of a real, shuffled shoe. */
  startArranged(seed: string, prefix: PresetCard[]): SessionState {
    const out = this.call({
      command: 'start_session_with_prefix', seed, bankroll: BANKROLL, default_bet: DEFAULT_BET, ruleset: null, prefix,
    });
    if (out.type !== 'session') throw new BridgeError(`expected session, got ${out.type}`);
    return out.data;
  }

  /** Start a normal (shuffled, unarranged) live session. */
  startLive(seed: string): SessionState {
    const out = this.call({ command: 'start_session', seed, bankroll: BANKROLL, default_bet: DEFAULT_BET, ruleset: null });
    if (out.type !== 'session') throw new BridgeError(`expected session, got ${out.type}`);
    return out.data;
  }

  /** Start an arranged session on the closed canonical ruleset for a declared profile. */
  startArrangedForProfile(profileId: StrategyProfileId, seed: string, prefix: PresetCard[]): SessionState {
    const out = this.call({
      command: 'start_session_with_prefix', seed, bankroll: BANKROLL, default_bet: DEFAULT_BET,
      ruleset: canonicalRuleset(profileId), prefix,
    });
    if (out.type !== 'session') throw new BridgeError(`expected session, got ${out.type}`);
    return out.data;
  }

  /** Start a live session on the closed canonical ruleset for a declared profile. */
  startLiveForProfile(profileId: StrategyProfileId, seed: string): SessionState {
    const out = this.call({
      command: 'start_session', seed, bankroll: BANKROLL, default_bet: DEFAULT_BET,
      ruleset: canonicalRuleset(profileId),
    });
    if (out.type !== 'session') throw new BridgeError(`expected session, got ${out.type}`);
    return out.data;
  }

  /** Return Rust's authoritative compatibility verdict without interpreting it in TypeScript. */
  checkStrategyCompatibility(profileId: StrategyProfileId, session: SessionState): StrategyCompatibility {
    const out = this.call({ command: 'check_strategy_compatibility', profile_id: profileId, session });
    if (out.type !== 'strategy_compatibility') {
      throw new BridgeError(`expected strategy_compatibility, got ${out.type}`);
    }
    return out.data;
  }

  /** Deal a round from the session's shoe at the default bet. */
  startRound(session: SessionState): SessionState {
    const out = this.call({ command: 'start_round', session, bet: null });
    if (out.type !== 'session') throw new BridgeError(`expected session, got ${out.type}`);
    return out.data;
  }

  /** Engine-owned legality: the only source of truth for what the player may do. */
  legalActions(session: SessionState): Action[] {
    const out = this.call({ command: 'legal_actions', session });
    if (out.type !== 'actions') throw new BridgeError(`expected actions, got ${out.type}`);
    return out.data;
  }

  /** Apply a player action; the engine advances the round (and any split hands). */
  applyAction(session: SessionState, action: Action): SessionState {
    const out = this.call({ command: 'apply_action', session, action });
    if (out.type !== 'session') throw new BridgeError(`expected session, got ${out.type}`);
    return out.data;
  }

  /** Dispatch a command; convert a core-rejected command into a recoverable CoreRuleError.
   *  A malformed/absent envelope surfaces as BridgeError (fatal) via parseCliOutput. */
  private call(cmd: CoreCommand): CoreResponse {
    let raw: string;
    try {
      raw = this.transport.call(JSON.stringify(cmd));
    } catch (e) {
      throw new BridgeError(`transport failure: ${(e as Error).message}`);
    }
    const out = parseCliOutput(raw);
    if (out.status === 'error') throw new CoreRuleError(out.message);
    return out.response;
  }
}
