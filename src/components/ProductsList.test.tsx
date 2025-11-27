import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import ProductsList from './ProductsList';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';

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

beforeEach(() => {
  vi.resetAllMocks();
});

const renderWithMantine = (ui: React.ReactElement) => {
  return render(<MantineProvider>{ui}</MantineProvider>);
};

describe('ProductsList', () => {
  const DATA_URL =
    'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

  const mockProducts = [
    {
      id: 1,
      name: 'Brocolli - 1 Kg',
      price: '120',
      image: 'https://example.com/brocolli.jpg',
      category: 'vegetables',
    },
  ];

  it('рендерит товары после успешного фетча', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    } as unknown as Response);

    const onAddToCart = vi.fn();

    renderWithMantine(<ProductsList onAddToCart={onAddToCart} />);

    const productTitle = await screen.findByText('Brocolli');
    expect(productTitle).toBeInTheDocument();

    expect(screen.getByText('$ 120')).toBeInTheDocument();
  });

  it('вызывает fetch с правильным URL', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue({
        ok: true,
        json: async () => mockProducts,
      } as unknown as Response);

    const onAddToCart = vi.fn();

    renderWithMantine(<ProductsList onAddToCart={onAddToCart} />);

    await screen.findByText('Brocolli');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(DATA_URL, expect.any(Object));
  });
});