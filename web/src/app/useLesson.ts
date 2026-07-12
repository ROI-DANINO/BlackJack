import { useSyncExternalStore } from 'react';
import type { LessonController } from '../learn/controller';
import type { LessonState } from '../learn/types';

export function useLesson(controller: LessonController): LessonState {
  return useSyncExternalStore(controller.subscribe, controller.getState, controller.getState);
}
