import type { Action, CoreCommand, SessionState } from '../bridge/types';
import { BridgeError, parseCliOutput } from '../bridge/validate';
import type { CoreTransport } from '../bridge/transport';
import type { DrillDecisionRecord, DrillState, DrillUnit, Situation } from './unit';
import { roundFeedback } from './feedback';

const BANKROLL = 100000;
const BET = 2000;

export class DrillController {
  private state: DrillState;
  private listeners = new Set<() => void>();
  private seqCounter = 0;

  constructor(
    private readonly transport: CoreTransport,
    unit: DrillUnit,
    private readonly freshSeed: () => string,
    private readonly seq: () => number = () => (this.seqCounter += 1),
  ) {
    this.state = {
      phase: 'situation', unit, situationIndex: 0, session: null, legalActions: [],
      hint: null, prompt: null, feedback: [], awaitingContinue: false, liveHandsPlayed: 0,
      records: [], error: null, fatal: null, busy: false,
    };
  }

  getState = (): DrillState => this.state;
  subscribe = (fn: () => void): (() => void) => { this.listeners.add(fn); return () => this.listeners.delete(fn); };

  begin = (): void => this.loadSituation(0);

  choose = (action: Action): void => {
    if (this.state.busy || (this.state.phase !== 'situation' && this.state.phase !== 'live')) return;
    const round = this.state.session?.round;
    if (!round || round.status !== 'player_turn' || !this.state.legalActions.includes(action)) return;
    this.run(() => {
      const next = this.command({ command: 'apply_action', session: this.state.session!, action });
      if (next) this.afterAction(next as SessionState);
    });
  };

  next = (): void => {
    if (this.state.busy) return;
    if (this.state.phase === 'situation') {
      const i = this.state.situationIndex + 1;
      if (i < this.state.unit.situations.length) this.loadSituation(i);
      else this.set({ phase: 'live_intro', awaitingContinue: false, prompt: this.state.unit.live.intro, feedback: [] });
    } else if (this.state.phase === 'live') {
      if (this.state.liveHandsPlayed >= this.state.unit.live.maxHands) this.set({ phase: 'recap', awaitingContinue: false });
      else this.dealLiveHand();
    }
  };

  beginLive = (): void => {
    if (this.state.busy) return;
    this.run(() => {
      const started = this.command({ command: 'start_session', seed: this.freshSeed(), bankroll: BANKROLL, default_bet: BET, ruleset: null });
      if (!started) return;
      this.set({ phase: 'live', session: started as SessionState, liveHandsPlayed: 0, feedback: [], awaitingContinue: false, hint: null });
      this.dealLiveHand();
    });
  };

  finish = (): void => { if (!this.state.busy) this.set({ phase: 'recap', awaitingContinue: false, prompt: null }); };
  retry = (): void => { if (!this.state.busy) this.loadSituation(this.state.situationIndex); };

  // ---- internals ----

  private loadSituation(index: number): void {
    this.run(() => {
      const situation = this.state.unit.situations[index]!;
      const prefix = situation.build(this.seq());
      const started = this.command({ command: 'start_session_with_prefix', seed: `lesson:${situation.id}`, bankroll: BANKROLL, default_bet: BET, ruleset: null, prefix });
      if (!started) { this.set({ error: `Could not set up “${situation.topic}.” Try again.` }); return; }
      const dealt = this.command({ command: 'start_round', session: started as SessionState, bet: null });
      if (!dealt) { this.set({ error: `Could not deal “${situation.topic}.” Try again.` }); return; }
      const session = dealt as SessionState;
      this.set({ phase: 'situation', situationIndex: index, session, error: null, feedback: [], awaitingContinue: false });
      if (session.round!.status === 'resolved') { this.resolveSituation(situation, session); return; }
      this.set({ legalActions: this.legal(session), hint: situation.hint ?? null, prompt: situation.intro });
    });
  }

  private afterAction(session: SessionState): void {
    if (this.state.phase === 'situation') {
      const situation = this.state.unit.situations[this.state.situationIndex]!;
      if (session.round?.status === 'resolved') { this.set({ session }); this.resolveSituation(situation, session); }
      else this.set({ session, legalActions: this.legal(session) });
      return;
    }
    if (session.round?.status === 'resolved') { this.set({ session }); this.resolveLive(session); }
    else this.set({ session, legalActions: this.legal(session) });
  }

  private resolveSituation(situation: Situation, session: SessionState): void {
    const r = session.round!;
    const lines = [...roundFeedback(r.hands, session.logs.at(-1)!.outcomes, r.dealer.cards), situation.teach];
    this.record('situation', situation, session, lines);
    this.set({ feedback: lines, awaitingContinue: true, hint: null, legalActions: [], prompt: null });
  }

  private dealLiveHand(): void {
    this.run(() => {
      const dealt = this.command({ command: 'start_round', session: this.state.session!, bet: null });
      if (!dealt) return;
      const session = dealt as SessionState;
      if (session.round?.status === 'resolved') { this.set({ session }); this.resolveLive(session); }
      else this.set({ session, legalActions: this.legal(session), feedback: [], awaitingContinue: false, prompt: null });
    });
  }

  private resolveLive(session: SessionState): void {
    const r = session.round!;
    const lines = roundFeedback(r.hands, session.logs.at(-1)!.outcomes, r.dealer.cards);
    this.record('live', null, session, lines);
    this.set({ feedback: lines, awaitingContinue: true, legalActions: [], liveHandsPlayed: this.state.liveHandsPlayed + 1 });
  }

  private record(phase: 'situation' | 'live', situation: Situation | null, session: SessionState, feedback: string[]): void {
    const r = session.round!;
    const log = session.logs.at(-1)!;
    this.state.records.push({
      phase, unitId: this.state.unit.id, topic: situation?.topic ?? 'Live practice', situationId: situation?.id ?? null,
      playerCardIds: r.hands.flatMap((h) => h.cards.map((c) => c.card_id)),
      dealerUpcardId: r.dealer.cards[0]?.card_id ?? null,
      legalActions: this.state.legalActions,
      actionsTaken: log.actions.filter((a) => a.action !== 'insurance_declined').map((a) => a.action as Action),
      outcomes: log.outcomes, feedback,
    });
  }

  private legal(session: SessionState): Action[] {
    if (session.round?.status !== 'player_turn') return [];
    return (this.command({ command: 'legal_actions', session }) as Action[] | null) ?? [];
  }

  /** Returns SessionState (or Action[] for legal_actions), or null on error. */
  private command(cmd: CoreCommand): SessionState | Action[] | null {
    let raw: string;
    try { raw = this.transport.call(JSON.stringify(cmd)); }
    catch (e) { this.set({ fatal: `transport failure: ${(e as Error).message}` }); return null; }
    let out;
    try { out = parseCliOutput(raw); }
    catch (e) { if (e instanceof BridgeError) { this.set({ fatal: e.message }); return null; } throw e; }
    if (out.status === 'error') { this.set({ error: out.message }); return null; }
    return out.response.data as SessionState | Action[];
  }

  private run(work: () => void): void {
    this.set({ busy: true });
    try { work(); } finally { this.state = { ...this.state, busy: false }; this.emit(); }
  }
  private set(patch: Partial<DrillState>): void { this.state = { ...this.state, ...patch }; this.emit(); }
  private emit(): void { for (const fn of this.listeners) fn(); }
}
