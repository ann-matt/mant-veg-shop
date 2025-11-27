import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import ProdCard from './ProdCard';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeAll } from 'vitest';

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

describe('ProdCard', () => {
  const name = 'Brocolli - 1 Kg';
  const price = 120;
  const image = 'https://example.com/brocolli.jpg';

  it('рендерит название и цену', () => {
    renderWithMantine(
      <ProdCard
        name={name}
        price={price}
        image={image}
        onAddToCart={() => {}}
      />,
    );

    expect(screen.getByText('Brocolli')).toBeInTheDocument();

    expect(screen.getByText('$ 120')).toBeInTheDocument();
  });

  it('рендерит картинку с правильным src и alt', () => {
    renderWithMantine(
      <ProdCard
        name={name}
        price={price}
        image={image}
        onAddToCart={() => {}}
      />,
    );

    const imgs = screen.getAllByAltText(name) as HTMLImageElement[];

    expect(imgs.length).toBeGreaterThan(0);
    expect(imgs[0]).toBeInTheDocument();
    expect(imgs[0]).toHaveAttribute('src', image);
    expect(imgs[0]).toHaveAttribute('alt', name);
  });

  it('рендерит кнопку "Add to Cart"', () => {
    renderWithMantine(
      <ProdCard
        name={name}
        price={price}
        image={image}
        onAddToCart={() => {}}
      />,
    );

    const buttons = screen.getAllByRole('button', { name: /add to cart/i });

expect(buttons.length).toBeGreaterThan(0);
expect(buttons[0]).toBeInTheDocument();
  });
});