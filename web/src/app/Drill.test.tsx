// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { initCoreForTest } from '../bridge/test-init';
import { WasmTransport } from '../bridge/core-client';
import { UNITS } from '../drill/units';
import { DrillController } from '../drill/controller';
import { Drill } from './Drill';

beforeAll(async () => { await initCoreForTest(); });
let n = 0;

describe('Drill view', () => {
  it('shows the situation prompt and its legal actions', () => {
    const c = new DrillController(new WasmTransport(), UNITS[2]!, () => `d-${(n += 1)}`, () => 0);
    render(<Drill controller={c} />);
    act(() => c.begin()); // double situation
    expect(screen.getByRole('button', { name: /double/i })).toBeTruthy();
  });

  it('shows feedback + Continue after a resolved hand', () => {
    const c = new DrillController(new WasmTransport(), UNITS[2]!, () => `d-${(n += 1)}`, () => 0);
    render(<Drill controller={c} />);
    act(() => c.begin());
    fireEvent.click(screen.getByRole('button', { name: /double/i })); // one card, resolves
    expect(screen.getByRole('button', { name: /continue/i })).toBeTruthy();
    expect(screen.getAllByRole('status').length).toBeGreaterThan(0);
  });

  it('does not show an active hand marker after a split situation resolves', () => {
    const c = new DrillController(new WasmTransport(), UNITS[2]!, () => `d-${(n += 1)}`, () => 0);
    render(<Drill controller={c} />);
    act(() => c.begin());
    fireEvent.click(screen.getByRole('button', { name: /double/i }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    fireEvent.click(screen.getByRole('button', { name: /split/i }));

    let guard = 0;
    while (!screen.queryByRole('button', { name: /continue/i }) && guard++ < 20) {
      const action =
        screen.queryByRole('button', { name: /^Stand$/ }) ??
        screen.getAllByRole('button').find((button) => /^(Hit|Double|Split)/.test(button.textContent ?? ''));
      expect(action).toBeTruthy();
      fireEvent.click(action!);
    }

    expect(screen.getByRole('button', { name: /continue/i })).toBeTruthy();
    expect(screen.queryByText(/playing/i)).toBeNull();
  });
});
