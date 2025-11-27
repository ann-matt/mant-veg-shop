import { Popover, Button, Group, Stack, Text, Image, Divider, Box, Badge } from '@mantine/core';
import { ShoppingCart } from 'lucide-react';
import cartEmpty from '../assets/cart_empty.svg';
import QuantityCheck from './QuantityCheck';

type Props = {
    count?: number,
    items?: CartItem[],
    onQtyChange?: (id: number, qty: number) => void;
    
}
export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  unit?: string;   // "1 kg"
  qty: number;
};

export default function ModalCart({ count = 0, items = [], onQtyChange }: Props) {
    const total = items.reduce((s, i) => s + i.price * i.qty, 0);

    

  return (
    <Popover width={300} trapFocus position="bottom" withArrow shadow="md" radius="md">
      <Popover.Target>

          <Button
          color="myColor"
           radius="md" 
           w={144} 
           rightSection={<ShoppingCart size={16} />}
           leftSection={count > 0 ? <Badge color="white" c="black" radius="xl">{count}</Badge> : null}>
            <Text size="md" fw={400}>Cart</Text>
          </Button>

      </Popover.Target>
      <Popover.Dropdown p="lg">
  {items.length === 0 ? (
          <Stack align="center" gap="xs">
            <Image src={cartEmpty} w={120} h={106} alt="Empty cart" />
            <Text c="dimmed" size="sm" ta="center">Your cart is empty!</Text>
          </Stack>
        ) : (
          <Stack gap="sm">
            {items.map((i, idx) => (
              <Box key={i.id}>
                <Group justify="space-between" align="center" wrap="nowrap">
                  {/* слева: картинка + название/вес + цена */}
                  <Group gap="sm" wrap="nowrap" style={{ minWidth: 0 }}>
                    <Image src={i.image} w={36} h={36} radius="sm" fit="cover" />
                    <Stack gap={2} style={{ minWidth: 0 }}>
                      <Group gap={6} wrap="nowrap">
                        <Text fw={600} lineClamp={1}>{i.name}</Text>
                        {i.unit && <Text c="dimmed" size="sm">{i.unit}</Text>}
                      </Group>
                      <Text fw={700}>${i.price}</Text>
                    </Stack>
                  </Group>

                  {/* справа: qty */}
                  <QuantityCheck
                    value={i.qty}
                    onChange={(v) => onQtyChange?.(i.id, v)}
                  />
                </Group>

                {idx < items.length - 1 && <Divider my="sm" />}
              </Box>
            ))}

            <Group justify="space-between" mt="xs">
              <Text fw={600}>Total</Text>
              <Text fw={700}>${total}</Text>
            </Group>
          </Stack>
        )}
      </Popover.Dropdown>
    </Popover>
  );
}