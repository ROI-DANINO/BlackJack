// Synchronous typed adapter over the Task 2 bridge. This is the only file under
// web/src/learn that touches raw JSON, CoreCommand, or CoreResponse shapes — the
// curriculum and controller layers only ever see typed data (e.g. HandFacts).
//
// Scope note: this task (knowledge-step progression: explain/question/recap) only
// needs describeHand. Session-lifecycle methods (start/round/actions) belong to the
// later hand-step task, which owns their exact signatures — they are not added here
// to avoid guessing a shape that task would have to rework.

import type { CoreTransport } from '../bridge/transport';
import type { CoreCommand, CoreResponse, HandFacts, PresetCard } from '../bridge/types';
import { BridgeError, CoreRuleError, parseCliOutput } from '../bridge/validate';

export class LearnEngine {
  constructor(private readonly transport: CoreTransport) {}

  describeHand(cards: PresetCard[]): HandFacts {
    const out = this.call({ command: 'describe_hand', cards });
    if (out.type !== 'hand_facts') throw new BridgeError(`expected hand_facts, got ${out.type}`);
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
