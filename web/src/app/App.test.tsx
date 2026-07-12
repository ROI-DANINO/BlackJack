// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { initCoreForTest } from '../bridge/test-init';
import { App } from './App';

beforeAll(async () => { await initCoreForTest(); });

describe('App', () => {
  it('defaults to Free Play', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /free play/i })).toBeTruthy();
  });

  it('opens the Learn navigator and can select a unit directly', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /learn/i }));
    expect(screen.getByRole('heading', { name: /blackjack basics/i })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Meet Blackjack' }));
    expect(screen.getByRole('heading', { name: /what is blackjack\?/i })).toBeTruthy();
  });

  it('switching to Free Play from Learn does not alter Free Play startup', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /learn/i }));
    expect(screen.getByRole('heading', { name: /blackjack basics/i })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /free play/i }));
    // Free Play returns to its unchanged startup heading + table.
    expect(screen.getByRole('heading', { name: /free play/i })).toBeTruthy();
  });
});
