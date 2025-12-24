import { AppShell } from '@mantine/core';
import Header from './Header';
import type { ReactNode } from 'react';


type Props = {
  children: ReactNode;

};

export function ShopLayout({ children }: Props) {
  return (
    <AppShell header={{ height: 59 }} padding="md">
      <AppShell.Header withBorder>
        <Header  />
      </AppShell.Header>

      <AppShell.Main bg="gray.2">{children}</AppShell.Main>
    </AppShell>
  );
}