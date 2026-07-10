import type { Action } from '../bridge/types';
import type { DrillController } from '../drill/controller';
import { HandView } from './HandView';
import { useDrill } from './useDrill';

const LABELS: Record<Action, string> = { hit: 'Hit', stand: 'Stand', double: 'Double', split: 'Split' };

export function Drill({ controller }: { controller: DrillController }) {
  const state = useDrill(controller);
  if (state.fatal) return <div role="alert">Something went wrong: {state.fatal}</div>;

  if (state.phase === 'recap') {
    return (
      <section>
        <h2>Recap — {state.unit.title}</h2>
        <ul>{state.records.map((r, i) => <li key={i}>{r.topic}: {r.outcomes.map((o) => o.result).join(', ')}</li>)}</ul>
        <p>{state.unit.goal}</p>
      </section>
    );
  }
  if (state.phase === 'live_intro') {
    return <section><p role="status">{state.prompt}</p><button onClick={() => controller.beginLive()}>Start real shoe</button></section>;
  }

  const round = state.session?.round ?? null;
  const hideFrom = round?.status === 'player_turn' ? 1 : undefined;
  return (
    <section>
      <h2>{state.unit.title}</h2>
      {state.error && <p role="status">{state.error} <button onClick={() => controller.retry()}>Try again</button></p>}
      {state.prompt && !state.awaitingContinue && <p>{state.prompt}</p>}
      {round && (
        <>
          <HandView label="Dealer" cards={round.dealer.cards} hideFrom={hideFrom} />
          {round.hands.map((h, i) => (
            <HandView key={i} label={`Hand ${i + 1}`} cards={h.cards} active={round.hands.length > 1 && i === round.active_hand_index} />
          ))}
        </>
      )}
      {state.awaitingContinue ? (
        <>
          {state.feedback.map((line, i) => <p role="status" key={i}>{line}</p>)}
          <button onClick={() => controller.next()}>Continue</button>
        </>
      ) : (
        <div>
          {state.legalActions.map((a) => (
            <button key={a} disabled={state.busy} onClick={() => controller.choose(a)}>
              {LABELS[a]}{state.hint === a ? ' (suggested)' : ''}
            </button>
          ))}
        </div>
      )}
      {state.phase === 'live' && <button onClick={() => controller.finish()}>Got it</button>}
    </section>
  );
}
