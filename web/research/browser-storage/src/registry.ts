import { dexieFactory } from './adapters/dexie';
import { idbFactory } from './adapters/idb';
import { localStorageFactory } from './adapters/local-storage';
import { memoryFactory } from './adapters/memory';
import { nativeIndexedDbFactory } from './adapters/native-indexeddb';
import type { CandidateId, ResearchAdapterFactory } from './contract';

export const candidateRegistry: ResearchAdapterFactory[] = [
  memoryFactory,
  localStorageFactory,
  nativeIndexedDbFactory,
  idbFactory,
  dexieFactory,
];

export function selectCandidates(candidate?: CandidateId): ResearchAdapterFactory[] {
  return candidate === undefined
    ? candidateRegistry
    : candidateRegistry.filter((factory) => factory.id === candidate);
}
