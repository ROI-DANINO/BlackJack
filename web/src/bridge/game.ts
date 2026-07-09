import type { Action, CliOutput, CoreCommand, Ruleset, SessionState } from './types';
import type { CoreTransport } from './transport';
import { BridgeError, parseCliOutput } from './validate';
import type { LogSink } from './log/sink';

const SCHEMA_VERSION = 1;
const HARNESS_VERSION = 'ts-bridge-0.1.0';

export type Phase = 'idle' | 'in_session' | 'fatal';
export interface Clock { now(): string }
export interface Ids { next(): string }

export interface GameState {
  phase: Phase;
  session: SessionState | null;
  legalActions: Action[];
  lastError: string | null;    // recoverable rule error
  fatalMessage: string | null; // poisoned/malformed core
}

export class GameController {
  private state: GameState = { phase: 'idle', session: null, legalActions: [], lastError: null, fatalMessage: null };
  private sessionId = '';
  private roundIndex = 0;
  private listeners = new Set<() => void>();

  constructor(
    private readonly transport: CoreTransport,
    private readonly sink: LogSink,
    private readonly clock: Clock,
    private readonly ids: Ids,
  ) {}

  getState = (): GameState => this.state;
  subscribe = (fn: () => void): (() => void) => { this.listeners.add(fn); return () => { this.listeners.delete(fn); }; };
  downloadLog = (): Blob => this.sink.export();

  async startSession(seed: string, bankroll: number, defaultBet: number, ruleset: Ruleset | null = null): Promise<void> {
    this.sessionId = this.ids.next();
    this.roundIndex = 0;
    const out = this.dispatch({ command: 'start_session', seed, bankroll, default_bet: defaultBet, ruleset });
    if (!out) return;
    if (out.status === 'error') { this.set({ lastError: out.message }); return; }
    if (out.response.type !== 'session') return;
    const session = out.response.data;
    await this.sink.write({
      type: 'session_header', schema_version: SCHEMA_VERSION, session_id: this.sessionId,
      seed: session.seed, started_at: this.clock.now(), starting_bankroll: session.bankroll,
      default_bet: session.default_bet, ruleset: session.ruleset, harness_version: HARNESS_VERSION,
    });
    this.set({ phase: 'in_session', session: this.strip(session), lastError: null });
  }

  async startRound(bet: number | null = null): Promise<void> {
    await this.command({ command: 'start_round', session: this.requireSession(), bet });
    this.refreshLegal();
  }

  async act(action: Action): Promise<void> {
    await this.command({ command: 'apply_action', session: this.requireSession(), action });
    this.refreshLegal();
  }

  async reshuffle(): Promise<void> {
    await this.command({ command: 'reshuffle', session: this.requireSession() });
  }

  // --- internals ---

  private async command(cmd: CoreCommand): Promise<void> {
    const out = this.dispatch(cmd);
    if (!out) return;
    if (out.status === 'error') { this.set({ lastError: out.message }); return; }
    if (out.response.type !== 'session') return;
    await this.applySession(out.response.data);
  }

  private async applySession(next: SessionState): Promise<void> {
    // We always send logs:[] onward, so next.logs holds only rounds resolved by THIS command.
    for (const log of next.logs) {
      await this.sink.write({
        type: 'round', schema_version: SCHEMA_VERSION, session_id: this.sessionId,
        round_index: this.roundIndex++, ts: this.clock.now(), ...log,
      });
    }
    this.set({ session: this.strip(next), lastError: null });
  }

  private refreshLegal(): void {
    const s = this.state.session;
    if (!s || !s.round || s.round.status !== 'player_turn') { this.set({ legalActions: [] }); return; }
    const out = this.dispatch({ command: 'legal_actions', session: s });
    if (out && out.status === 'ok' && out.response.type === 'actions') this.set({ legalActions: out.response.data });
  }

  private dispatch(cmd: CoreCommand): CliOutput | null {
    let raw: string;
    try { raw = this.transport.call(JSON.stringify(cmd)); }
    catch (e) { this.fail(`transport failure: ${(e as Error).message}`); return null; }
    try { return parseCliOutput(raw); }
    catch (e) { if (e instanceof BridgeError) { this.fail(e.message); return null; } throw e; }
  }

  /** Sink is the durable record; drop logs from retained/outbound state to bound payload size. */
  private strip(s: SessionState): SessionState { return { ...s, logs: [] }; }

  private requireSession(): SessionState {
    if (!this.state.session) throw new BridgeError('no active session');
    return this.state.session;
  }

  private set(patch: Partial<GameState>): void { this.state = { ...this.state, ...patch }; this.emit(); }
  private fail(message: string): void { this.state = { ...this.state, phase: 'fatal', fatalMessage: message }; this.emit(); }
  private emit(): void { for (const l of this.listeners) l(); }
}
