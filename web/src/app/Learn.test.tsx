// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { initCoreForTest } from '../bridge/test-init';
import { BLACKJACK_BASICS } from '../learn/content/blackjack-basics';
import { Learn } from './Learn';

beforeAll(async () => { await initCoreForTest(); });

const UNIT_TITLES = [
  'Meet Blackjack',
  'Read Your Hand',
  'How a Round Works',
  'Hit and Stand',
  'Win, Lose, or Push',
  'Blackjack Is Special',
  'Double Down',
  'Split a Pair',
  'Play a Full Round',
];

/** Drive Meet Blackjack (explain -> question -> question -> recap) to its recap step. */
function completeMeetBlackjack() {
  fireEvent.click(screen.getByRole('button', { name: 'Meet Blackjack' }));
  fireEvent.click(screen.getByRole('button', { name: /continue/i })); // past intro explain
  fireEvent.click(screen.getByRole('button', { name: /beat the dealer/i })); // goal question
  fireEvent.click(screen.getByRole('button', { name: /continue/i }));
  fireEvent.click(screen.getByRole('button', { name: /^10$/ })); // Queen worth question
  fireEvent.click(screen.getByRole('button', { name: /continue/i }));
}

describe('Learn navigator', () => {
  it('shows the subject title and all nine units in order', () => {
    render(<Learn />);
    expect(screen.getByRole('heading', { name: BLACKJACK_BASICS.title })).toBeTruthy();
    const list = screen.getByRole('list');
    const buttons = within(list).getAllByRole('button');
    expect(buttons.map((b) => b.textContent)).toEqual(UNIT_TITLES);
  });

  it('opens the first unit directly', () => {
    render(<Learn />);
    fireEvent.click(screen.getByRole('button', { name: 'Meet Blackjack' }));
    expect(screen.getByRole('heading', { name: /what is blackjack\?/i })).toBeTruthy();
  });

  it('opens any later unit directly, without gating on prerequisites', () => {
    render(<Learn />);
    fireEvent.click(screen.getByRole('button', { name: 'How a Round Works' }));
    expect(screen.getByRole('heading', { name: /the shape of a round/i })).toBeTruthy();
  });

  it('returns to the unit list from a completed unit and can replay it', () => {
    render(<Learn />);
    completeMeetBlackjack();
    // Recap: Return to units.
    expect(screen.getByRole('heading', { name: /meet blackjack — done/i })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /return to units/i }));
    // Back at the list.
    expect(screen.getByRole('heading', { name: BLACKJACK_BASICS.title })).toBeTruthy();
    // Reopening a completed unit replays it cleanly from step one.
    fireEvent.click(screen.getByRole('button', { name: 'Meet Blackjack' }));
    expect(screen.getByRole('heading', { name: /what is blackjack\?/i })).toBeTruthy();
  });
});
