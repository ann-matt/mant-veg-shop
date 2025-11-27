import { useEffect, useState } from 'react';
import { Alert, Loader, Stack } from '@mantine/core';
import ProdCard from './ProdCard.tsx';
import type { Product } from '../App';

type Props = { onAddToCart: (p: Product, qty: number) => void };

type ApiProduct = {
  id: number;
  name: string;
  price: number | string;
  image: string;
  category: string;
};

const DATA_URL =
  'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

export default function ProductsList({ onAddToCart }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(DATA_URL, { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: ApiProduct[] = await res.json();

        // На всякий случай приводим типы (price → number)
        const normalized: Product[] = data.map((p) => ({
          id: p.id,
          name: p.name,
          price: typeof p.price === 'string' ? Number(p.price) : p.price,
          image: p.image,
        }));

        setProducts(normalized);
      } catch (e: unknown) {
         if (e instanceof DOMException && e.name === 'AbortError') {
          return
        } 
        
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => ac.abort();
  }, []);

  if (loading) {
    return (
      <Stack align="center" py="lg">
        <Loader />
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert color="red" title="Не удалось загрузить товары">
        {error}
      </Alert>
    );
  }

  return (
    <>
      {products.map((prod) => (
        <ProdCard
          key={prod.id}
          id={prod.id}
          name={prod.name}
          price={prod.price}
          image={prod.image}
          onAddToCart={(qty) =>
            onAddToCart(
              { id: prod.id, name: prod.name, price: prod.price, image: prod.image },
              qty
            )
          }
        />
      ))}
    </>
  );
}