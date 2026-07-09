import { useSyncExternalStore } from 'react';
import type { GameController, GameState } from '../bridge/game';

export function useGame(controller: GameController): GameState {
  return useSyncExternalStore(controller.subscribe, controller.getState, controller.getState);
}
