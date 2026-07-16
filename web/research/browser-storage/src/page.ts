import type { BrowserSuiteResult, CandidateId } from './contract';
import { selectCandidates } from './registry';
import {
  runBrowserSuite,
  runConcurrentWriterProbe,
  runMeasurementProbe,
  runReloadProbe,
} from './suite';

declare global {
  interface Window {
    __runBrowserStorageResearch: () => Promise<BrowserSuiteResult>;
  }
}

window.__runBrowserStorageResearch = async () => {
  const query = new URLSearchParams(window.location.search);
  const candidate = query.get('candidate') as CandidateId | null;
  const correctnessOnly = query.get('correctnessOnly') === '1';
  const mode = query.get('mode');
  const factories = selectCandidates(candidate ?? undefined);
  if (mode === null) return runBrowserSuite(factories, correctnessOnly);
  const factory = factories[0];
  if (factory === undefined || candidate === null) throw new Error('probe requires one candidate');
  if (mode === 'reload-write' || mode === 'reload-read') {
    return runReloadProbe(factory, mode === 'reload-write' ? 'write' : 'read');
  }
  if (mode === 'concurrent-a' || mode === 'concurrent-b') {
    return runConcurrentWriterProbe(factory, mode === 'concurrent-a' ? 'a' : 'b');
  }
  if (mode === 'measurement') return runMeasurementProbe(factory);
  throw new Error(`unknown research mode: ${mode}`);
};

export {};
