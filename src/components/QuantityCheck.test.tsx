import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import QuantityCheck from './QuantityCheck';
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

describe('QuantityCheck', () => {
  it('рендерит текущее значение', () => {
    renderWithMantine(
      <QuantityCheck value={3} onChange={() => {}} />,
    );

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  

  it('кнопка Decrease активна, когда value > min', () => {
    renderWithMantine(
      <QuantityCheck value={2} onChange={() => {}} min={1} max={5} />,
    );

    const [decButton] = screen.getAllByRole('button', {
      name: /decrease quantity/i,
    });

    expect(decButton).not.toBeDisabled();  
  });



  
});