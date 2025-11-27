import { Container, Title, SimpleGrid } from '@mantine/core';
import ProductsList from '../components/ProductsList';
import type { Product } from '../App';

type Props = { onAddToCart: (p: Product, qty: number) => void };

export function CatalogPage({ onAddToCart }: Props) {
  return (
    <Container size="1280" mt={50} mb={40} p={0}>
      <Title order={2} mb="md">Catalog</Title>
      <SimpleGrid mt={42} spacing={10} cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
        <ProductsList onAddToCart={onAddToCart} />
      </SimpleGrid>
    </Container>
  );
}