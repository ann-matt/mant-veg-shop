import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { ShopLayout } from './ShopLayout';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeAll, vi } from 'vitest';


vi.mock('./Header', () => ({
  __esModule: true,
  default: ({ cartCount }: { cartCount: number }) => (
    <div>Mock header, count: {cartCount}</div>
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

const renderWithMantine = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>);

describe('ShopLayout', () => {
  it('рендерит Header и children', () => {
    const cartCount = 5;

    renderWithMantine(
      <ShopLayout
        cartCount={cartCount}
        cartItems={[]}
        onQtyChange={() => {}}
      >
        <div>Content</div>
      </ShopLayout>,
    );

    expect(screen.getByText('Content')).toBeInTheDocument();

    expect(
      screen.getByText(`Mock header, count: ${cartCount}`),
    ).toBeInTheDocument();
  });
});