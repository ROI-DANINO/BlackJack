/** Fresh per-session seed so Free Play doesn't replay one fixed shoe (QA-009).
 *  Reproducibility is preserved: the seed is written to the JSONL session_header
 *  and shown in the UI, and the engine deals deterministically from any seed. */
export function freshSeed(): string {
  return `fp-${Math.random().toString(36).slice(2, 12)}`;
}
