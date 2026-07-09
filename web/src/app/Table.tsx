import type { GameController } from '../bridge/game';
import { useGame } from './useGame';
import { HandView } from './HandView';
import { Controls } from './Controls';

export function Table({ controller }: { controller: GameController }) {
  const state = useGame(controller);

  if (state.phase === 'fatal') {
    return <div role="alert"><h2>Something broke</h2><p>{state.fatalMessage}</p><p>Please reload the page.</p></div>;
  }

  if (state.phase === 'idle') {
    return (
      <button onClick={() => void controller.startSession('free-play', 100000, 2000)}>
        Start session
      </button>
    );
  }

  const s = state.session!;
  const round = s.round;
  const dealerHideFrom = round && round.status === 'player_turn' ? 1 : undefined;
  return (
    <div>
      <p>Bankroll: ${(s.bankroll / 100).toFixed(2)}</p>
      {round ? <HandView label="Dealer" cards={round.dealer.cards} hideFrom={dealerHideFrom} /> : null}
      {round ? round.hands.map((h, i) => <HandView key={i} label={`Hand ${i + 1}`} cards={h.cards} />) : null}
      {state.lastError ? <p role="status">{state.lastError}</p> : null}
      <Controls controller={controller} state={state} />
      <button onClick={() => {
        const url = URL.createObjectURL(controller.downloadLog());
        const stamp = new Date().toISOString().replace(/[:.]/g, '-');
        const a = document.createElement('a'); a.href = url; a.download = `blackjack-session-${stamp}.jsonl`; a.click();
        URL.revokeObjectURL(url);
      }}>Download history</button>
    </div>
  );
}
