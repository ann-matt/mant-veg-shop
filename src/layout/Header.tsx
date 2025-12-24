import { Container, Group, Text, Badge } from '@mantine/core';
import ModalCart from '../components/ModalCart.tsx';




export default function Header() {
  return (
    <Container size={1440} h="100%">
      <Group h="100%" justify="space-between">
        <Group gap="xs" h={33} w={209}>
          <Text fw={700} size="lg">Vegetable</Text>
          <Badge color="myColor" radius="xl" tt="uppercase" w={80} h={33} fw={500} size="lg">
            Shop
          </Badge>
        </Group>
        <ModalCart />
      </Group>
    </Container>
  );
}