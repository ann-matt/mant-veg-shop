import { AppShell } from '@mantine/core';
import Header from './Header';
import type { ReactNode } from 'react';
import type { CartItem } from '../App';

type Props = {
  children: ReactNode;
  cartCount: number;
  cartItems: CartItem[];
  onQtyChange: (id: number, qty: number) => void;
};

export function ShopLayout({ children, cartCount, cartItems, onQtyChange }: Props) {
  return (
    <AppShell header={{ height: 59 }} padding="md">
      <AppShell.Header withBorder>
        <Header cartCount={cartCount} cartItems={cartItems} onQtyChange={onQtyChange} />
      </AppShell.Header>

      <AppShell.Main bg="gray.2">{children}</AppShell.Main>
    </AppShell>
  );
}