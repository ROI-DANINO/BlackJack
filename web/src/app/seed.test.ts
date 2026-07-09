import { describe, it, expect } from 'vitest';
import { freshSeed } from './seed';

describe('freshSeed', () => {
  it('produces prefixed, url-safe seeds', () => {
    expect(freshSeed()).toMatch(/^fp-[a-z0-9]{1,10}$/);
  });
  it('produces distinct seeds per call', () => {
    const seeds = new Set(Array.from({ length: 50 }, freshSeed));
    expect(seeds.size).toBe(50);
  });
});
