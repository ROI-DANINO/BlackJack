// Thin, unstyled renderer for a LessonController: reflects LessonState and drives it back
// through its public methods only (begin/continue/choose/answer/retry). Deliberately plain —
// no CSS, animation, images, drag/drop, rewards, or custom layout infrastructure; that product
// polish is out of scope until V3. Reuses HandView for hand steps rather than re-rendering cards.

import type { Action } from '../bridge/types';
import type { LessonController } from '../learn/controller';
import type { LessonStep } from '../learn/types';
import { HandView } from './HandView';
import { useLesson } from './useLesson';

const ACTION_LABELS: Record<Action, string> = { hit: 'Hit', stand: 'Stand', double: 'Double', split: 'Split' };

export function Lesson({ controller, onExit }: { controller: LessonController; onExit: () => void }) {
  const state = useLesson(controller);

  if (state.fatal) return <div role="alert">{state.fatal}</div>;
  if (!state.step) return null; // before begin() populates the first step

  const step = state.step;
  return (
    <section>
      {state.error && <p role="alert">{state.error}</p>}
      {renderStep(step, state, controller, onExit)}
    </section>
  );
}

function renderStep(
  step: LessonStep,
  state: ReturnType<typeof useLesson>,
  controller: LessonController,
  onExit: () => void,
) {
  switch (step.type) {
    case 'explain':
      return (
        <>
          <h2>{step.title}</h2>
          <p>{step.body}</p>
          <button onClick={() => controller.continue()}>Continue</button>
        </>
      );

    case 'question': {
      const showRetry = state.feedback != null && !state.awaitingContinue;
      const showContinue = state.feedback != null && state.awaitingContinue;
      return (
        <>
          <p>{step.prompt}</p>
          {!showRetry && !showContinue && (
            <div>
              {step.choices.map((choice) => (
                <button key={choice.value} onClick={() => controller.choose(choice.value)}>
                  {choice.label}
                </button>
              ))}
            </div>
          )}
          {state.feedback && <p role="status">{state.feedback}</p>}
          {showRetry && <button onClick={() => controller.retry()}>Retry</button>}
          {showContinue && <button onClick={() => controller.continue()}>Continue</button>}
        </>
      );
    }

    case 'hand': {
      const round = state.session?.round ?? null;
      const hideFrom = round?.status === 'player_turn' ? 1 : undefined;
      return (
        <>
          <h2>{step.title}</h2>
          <p>{step.intro}</p>
          {round && (
            <>
              <HandView label="Dealer" cards={round.dealer.cards} hideFrom={hideFrom} />
              {round.hands.map((h, i) => (
                <HandView
                  key={i}
                  label={`Hand ${i + 1}`}
                  cards={h.cards}
                  active={round.status === 'player_turn' && round.hands.length > 1 && i === round.active_hand_index}
                />
              ))}
            </>
          )}
          {state.awaitingContinue ? (
            <>
              {state.feedback && <p role="status">{state.feedback}</p>}
              <button onClick={() => controller.continue()}>Continue</button>
            </>
          ) : (
            <div>
              {state.legalActions.map((action) => (
                <button key={action} onClick={() => controller.choose(action)}>
                  {ACTION_LABELS[action]}
                </button>
              ))}
            </div>
          )}
        </>
      );
    }

    case 'recap':
      return (
        <>
          <h2>{step.title}</h2>
          <ul>
            {step.capabilities.map((capability) => <li key={capability.outcomeId}>{capability.text}</li>)}
          </ul>
          <button onClick={onExit}>Return to units</button>
        </>
      );

    default: {
      const exhaustive: never = step;
      throw new Error(`unhandled lesson step type: ${JSON.stringify(exhaustive)}`);
    }
  }
}
