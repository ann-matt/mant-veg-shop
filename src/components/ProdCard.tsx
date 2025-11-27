import { Card, Image, Text, Button, Group } from '@mantine/core';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import QuantityCheck from './QuantityCheck.tsx';

type ProdCardProps = {
  id?: number;
  name: string;
  price: number;
  image: string;
  onAddToCart:(qty: number) => void,
}

export default function ProdCard({name, price, image, onAddToCart}: ProdCardProps) {
  const parts = name.split("-").map(x => x.trim());
  const title = parts[0] || name;
  const kilos = parts[1] || " ";
  const [qty, setQty] = useState<number>(1);
        return (
        <Card withBorder radius="xl" shadow="sm" p="md" mb="md" w={302} h={414}>
      <Card.Section>
        <Image
          src={image}
          alt={name}
          w={276}
          h={276}
          mx="auto"
        />
      </Card.Section>

      
      <Group justify="space-between" mt="md" mb="xs" wrap="nowrap">
          <Group>
          <Text fw={500} style={{ whiteSpace: 'nowrap' }}>{title}</Text>
          <Text span c="dimmed" size="sm">{kilos}</Text>
          </Group>
          <QuantityCheck value={qty} onChange={setQty}/>
      </Group>

      <Group justify="space-between" mt="md" mb="xs" wrap="nowrap" >
        <Text size="md" c="black" fw={600} w={54}>
        $ {price}
      </Text>
      <Button onClick={() => onAddToCart(qty)} variant="light" color="myColor" radius="md" rightSection={<ShoppingCart size={16}/>} w="100%">
        Add to Cart
      </Button>

      </Group>
    </Card>
        )



    

}