import type { GameController } from '../bridge/game';
import type { HandOutcome } from '../bridge/types';
import { useGame } from './useGame';
import { HandView } from './HandView';
import { Controls } from './Controls';

const RESULT_LABEL: Record<HandOutcome['result'], string> = {
  win: 'Win',
  loss: 'Loss',
  push: 'Push',
  blackjack: 'Blackjack',
};

function formatOutcome(outcome: HandOutcome): string {
  const dollars = `$${(Math.abs(outcome.delta) / 100).toFixed(2)}`;
  const signed = outcome.delta > 0 ? `+${dollars}` : outcome.delta < 0 ? `-${dollars}` : dollars;
  return `${RESULT_LABEL[outcome.result]} (${signed})`;
}

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
  const outcomesByHand = new Map(state.lastOutcomes.map((outcome) => [outcome.hand_index, outcome]));
  const dealerHideFrom = round && round.status === 'player_turn' ? 1 : undefined;
  return (
    <div>
      <p>Bankroll: ${(s.bankroll / 100).toFixed(2)}</p>
      {round ? <HandView label="Dealer" cards={round.dealer.cards} hideFrom={dealerHideFrom} /> : null}
      {round ? round.hands.map((h, i) => {
        const outcome = outcomesByHand.get(i);
        const active = round.status === 'player_turn' && round.hands.length > 1 && i === round.active_hand_index;
        return (
          <div key={i}>
            <HandView label={`Hand ${i + 1}`} cards={h.cards} active={active} />
            {outcome ? <span>{formatOutcome(outcome)}</span> : null}
          </div>
        );
      }) : null}
      {state.notice ? <p role="status">{state.notice}</p> : null}
      {state.lastError ? <p role="status">{state.lastError}</p> : null}
      <Controls controller={controller} state={state} />
      {state.canNote ? (
        <label>
          Note for this hand:{' '}
          <input
            type="text"
            value={state.noteDraft}
            placeholder="optional — saved with this hand on Deal"
            onChange={(e) => controller.setNote(e.target.value)}
          />
        </label>
      ) : null}
      <button onClick={async () => {
        const url = URL.createObjectURL(await controller.downloadLog());
        const stamp = new Date().toISOString().replace(/[:.]/g, '-');
        const a = document.createElement('a'); a.href = url; a.download = `blackjack-session-${stamp}.jsonl`; a.click();
        URL.revokeObjectURL(url);
      }}>Download history</button>
    </div>
  );
}
