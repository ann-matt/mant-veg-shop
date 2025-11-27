import { Container, Group, Text, Badge } from '@mantine/core';
import ModalCart from '../components/ModalCart.tsx';
import type { CartItem } from '../components/ModalCart';

type Props = {
  cartCount: number;
  cartItems: CartItem[];
  onQtyChange: (id: number, qty: number) => void;
};

export default function Header({ cartCount, cartItems, onQtyChange }: Props) {
  return (
    <Container size={1440} h="100%">
      <Group h="100%" justify="space-between">
        <Group gap="xs" h={33} w={209}>
          <Text fw={700} size="lg">Vegetable</Text>
          <Badge color="myColor" radius="xl" tt="uppercase" w={80} h={33} fw={500} size="lg">
            Shop
          </Badge>
        </Group>
        <ModalCart count={cartCount} items={cartItems} onQtyChange={onQtyChange} />
      </Group>
    </Container>
  );
}