import { describe, expect, it } from 'vitest';
import { UNITS } from './units';

describe('Get to Know Blackjack units', () => {
  it('has three short micro-units', () => {
    expect(UNITS).toHaveLength(3);
    expect(UNITS.map((u) => u.id)).toEqual(['reading-the-table', 'hit-stand-stakes', 'double-split']);
  });
  it('each unit has a small situation set and a 5–10 live tail', () => {
    for (const u of UNITS) {
      expect(u.situations.length).toBeGreaterThanOrEqual(1);
      expect(u.situations.length).toBeLessThanOrEqual(4);
      expect(u.live.minHands).toBe(5);
      expect(u.live.maxHands).toBe(10);
    }
  });
  it('teaches double and split only in the third unit', () => {
    const topics = UNITS[2]!.situations.map((s) => s.id);
    expect(topics).toContain('double');
    expect(topics).toContain('split');
  });
});
