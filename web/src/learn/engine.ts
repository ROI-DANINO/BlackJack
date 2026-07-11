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
import type { Action, CoreCommand, CoreResponse, HandFacts, PresetCard, SessionState } from '../bridge/types';
import { BridgeError, CoreRuleError, parseCliOutput } from '../bridge/validate';

// Teaching-session constants, matching Free Play / drill sessions (web/src/breakit-hook.ts:16-17).
const BANKROLL = 100000; // cents
const DEFAULT_BET = 2000; // cents

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
