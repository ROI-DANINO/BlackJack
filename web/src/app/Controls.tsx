import type { Action } from '../bridge/types';
import type { GameController, GameState } from '../bridge/game';

const LABELS: Record<Action, string> = { hit: 'Hit', stand: 'Stand', double: 'Double', split: 'Split' };

export function Controls({ controller, state }: { controller: GameController; state: GameState }) {
  const round = state.session?.round ?? null;
  const inPlayerTurn = round?.status === 'player_turn';
  return (
    <div>
      {!round || round.status === 'resolved'
        ? <button onClick={() => void controller.startRound(state.session?.default_bet ?? null)}>Deal</button>
        : null}
      {inPlayerTurn
        ? state.legalActions.map((a) => (
            <button key={a} onClick={() => void controller.act(a)}>{LABELS[a]}</button>
          ))
        : null}
    </div>
  );
}
