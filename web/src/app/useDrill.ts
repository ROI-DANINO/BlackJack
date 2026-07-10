import { useSyncExternalStore } from 'react';
import type { DrillController } from '../drill/controller';
import type { DrillState } from '../drill/unit';

export function useDrill(controller: DrillController): DrillState {
  return useSyncExternalStore(controller.subscribe, controller.getState, controller.getState);
}
