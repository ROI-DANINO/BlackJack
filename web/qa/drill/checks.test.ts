import { describe, expect, it } from 'vitest';
import { checkArrangedProvenance, checkComposition, checkLiveProvenance } from './checks';

describe('drill checks', () => {
  it('flags a leading card that is not arranged-origin', () => {
    expect(checkArrangedProvenance([{ deck_id: 'arranged' }] as any).passed).toBe(true);
    expect(checkArrangedProvenance([{ deck_id: 'deck-1' }] as any).passed).toBe(false);
  });

  it('requires live cards from a shuffled deck', () => {
    expect(checkLiveProvenance([{ deck_id: 'deck-3' }] as any).passed).toBe(true);
    expect(checkLiveProvenance([{ deck_id: 'arranged' }] as any).passed).toBe(false);
  });

  it('requires a true six-deck composition', () => {
    expect(checkComposition(Array(312).fill({}) as any).passed).toBe(true);
    expect(checkComposition(Array(300).fill({}) as any).passed).toBe(false);
  });
});
