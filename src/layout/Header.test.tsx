import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import Header from './Header';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeAll, vi } from 'vitest';

vi.mock('../components/ModalCart.tsx', () => ({
  __esModule: true,
  default: ({ count }: { count: number }) => (
    <div>Mock cart, items: {count}</div>
  ),
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

const renderWithMantine = (ui: React.ReactElement) => {
  return render(<MantineProvider>{ui}</MantineProvider>);
};

describe('Header', () => {
  const cartCount = 3;
  const onQtyChange = vi.fn();

  it('рендерит название магазина и бейдж Shop', () => {
    renderWithMantine(
      <Header
        cartCount={cartCount}
        cartItems={[]}
        onQtyChange={onQtyChange}
      />,
    );

    expect(screen.getByText('Vegetable')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
  });


});