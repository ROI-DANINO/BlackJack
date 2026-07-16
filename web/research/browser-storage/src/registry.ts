import type {
  CandidateId,
  ResearchAdapterFactory,
  ResearchFailureControls,
  ResearchProgressStore,
} from './contract';

const candidateIds: CandidateId[] = ['memory', 'local-storage', 'native-indexeddb', 'idb', 'dexie'];

function notImplemented(id: CandidateId): never {
  throw new Error(`candidate ${id} not implemented`);
}

function stubControls(id: CandidateId): ResearchFailureControls {
  return {
    abortNextWrite: () => notImplemented(id),
    abortNextUpgrade: () => notImplemented(id),
    injectRawEnvelope: async () => notImplemented(id),
    setQuotaError: () => notImplemented(id),
    setUnavailable: () => notImplemented(id),
  };
}

function stubFactory(id: CandidateId): ResearchAdapterFactory {
  return {
    id,
    create(): ResearchProgressStore {
      return notImplemented(id);
    },
    controls: stubControls(id),
  };
}

export const candidateRegistry: ResearchAdapterFactory[] = candidateIds.map(stubFactory);

export function selectCandidates(candidate?: CandidateId): ResearchAdapterFactory[] {
  return candidate === undefined
    ? candidateRegistry
    : candidateRegistry.filter((factory) => factory.id === candidate);
}
