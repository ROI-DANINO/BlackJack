// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { initCoreForTest } from '../bridge/test-init';
import { App } from './App';

beforeAll(async () => { await initCoreForTest(); });

describe('App', () => {
  it('defaults to Free Play and can open a drill unit', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /free play/i })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /learn/i }));
    fireEvent.click(screen.getByRole('button', { name: /reading the table/i }));
    expect(screen.getByRole('heading', { name: /reading the table/i })).toBeTruthy();
  });
});
