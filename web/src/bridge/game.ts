import type { Action, CliOutput, CoreCommand, HandOutcome, Ruleset, SessionState } from './types';
import type { CoreTransport } from './transport';
import { BridgeError, parseCliOutput } from './validate';
import type { LogSink, RoundLine } from './log/sink';

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
  noteDraft: string;           // in-progress note for the just-resolved hand
  notice: string | null;       // transient info (e.g. shoe reshuffled)
  canNote: boolean;            // a resolved hand is buffered, awaiting note + flush
  lastOutcomes: HandOutcome[]; // latest resolved round outcomes for display
}

export class GameController {
  private state: GameState = {
    phase: 'idle', session: null, legalActions: [], lastError: null, fatalMessage: null,
    noteDraft: '', notice: null, canNote: false, lastOutcomes: [],
  };
  private sessionId = '';
  private roundIndex = 0;
  private pendingLine: RoundLine | null = null; // resolved round buffered until note + flush
  private listeners = new Set<() => void>();

  constructor(
    private readonly transport: CoreTransport,
    private readonly sink: LogSink,
    private readonly clock: Clock,
    private readonly ids: Ids,
  ) {}

  getState = (): GameState => this.state;
  subscribe = (fn: () => void): (() => void) => { this.listeners.add(fn); return () => { this.listeners.delete(fn); }; };
  downloadLog = async (): Promise<Blob> => { await this.flushPending(); return this.sink.export(); };

  /** Set the note for the just-resolved hand; saved when it flushes (next Deal / Download). */
  setNote(text: string): void { this.set({ noteDraft: text }); }

  async startSession(seed: string, bankroll: number, defaultBet: number, ruleset: Ruleset | null = null): Promise<void> {
    this.sessionId = this.ids.next();
    this.roundIndex = 0;
    this.pendingLine = null; // drop any buffered round from a prior session on this controller
    this.set({ noteDraft: '', notice: null, canNote: false, lastOutcomes: [] });
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
    await this.flushPending();     // write the previous hand (with its note) before dealing
    this.set({ notice: null, lastOutcomes: [] });
    await this.command({ command: 'start_round', session: this.requireSession(), bet });
    // Shoe hit penetration: auto-reshuffle and deal again so Free Play never dead-ends.
    if (this.state.lastError?.includes('shoe must reshuffle')) {
      this.set({ lastError: null });
      await this.reshuffle();   // one source of truth for issuing the reshuffle command
      if (!this.state.lastError) {
        this.set({ notice: 'Shoe reshuffled — new shoe' });
        await this.command({ command: 'start_round', session: this.requireSession(), bet });
      }
    }
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
    // Buffer the resolved round instead of writing it now, so a note typed after the hand
    // (attach-on-Deal) rides along when it flushes. At most one round resolves per command.
    let lastOutcomes = this.state.lastOutcomes;
    for (const log of next.logs) {
      if (this.pendingLine) await this.writePending(null); // defensive; never expected
      this.pendingLine = {
        type: 'round', schema_version: SCHEMA_VERSION, session_id: this.sessionId,
        round_index: this.roundIndex++, ts: this.clock.now(), note: null, ...log,
      };
      lastOutcomes = log.outcomes;
      this.set({ canNote: true });
    }
    const notice = next.round?.actions.some((item) => item.action === 'insurance_declined')
      ? 'Insurance auto-declined'
      : this.state.notice;
    this.set({ session: this.strip(next), lastOutcomes, notice, lastError: null });
  }

  private async writePending(note: string | null): Promise<void> {
    if (!this.pendingLine) return;
    await this.sink.write({ ...this.pendingLine, note });
    this.pendingLine = null;
  }

  /** Flush the buffered resolved round with the current note draft (or null if blank). */
  private async flushPending(): Promise<void> {
    if (!this.pendingLine) return;
    const draft = this.state.noteDraft.trim();
    await this.writePending(draft === '' ? null : draft);
    this.set({ canNote: false, noteDraft: '' });
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
