import { describe, it, expect, vi } from 'vitest';
import { freshSeed } from './seed';

describe('freshSeed', () => {
  it('produces prefixed, url-safe seeds', () => {
    expect(freshSeed()).toMatch(/^fp-[a-z0-9]{1,10}$/);
  });
  it('produces distinct seeds per call', () => {
    const seeds = new Set(Array.from({ length: 50 }, freshSeed));
    expect(seeds.size).toBe(50);
  });
  it('still satisfies the format when Math.random returns exactly 0', () => {
    const spy = vi.spyOn(Math, 'random').mockReturnValue(0);
    try {
      expect(freshSeed()).toMatch(/^fp-[a-z0-9]{1,10}$/);
    } finally {
      spy.mockRestore();
    }
  });
});
