import { useState } from 'react';
import { ShopLayout } from './layout/ShopLayout';
import { CatalogPage } from './pages/Catalog';

export type Product = { id: number; name: string; price: number; image: string; unit?: string };
export type CartItem = Product & { qty: number };

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const addToCart = (p: Product, qty: number) => {
    setCartItems(prev => {
      const i = prev.findIndex(x => x.id === p.id);
      if (i === -1) return [...prev, { ...p, qty }];
      const next = [...prev];
      next[i] = { ...next[i], qty: Math.min(99, next[i].qty + qty) };
      return next;
    });
  };

  const changeQty = (id: number, qty: number) => {
    setCartItems(prev => prev.map(i => (i.id === id ? { ...i, qty } : i)));
  };

  return (
    <ShopLayout cartCount={cartCount} cartItems={cartItems} onQtyChange={changeQty}>
      <CatalogPage onAddToCart={addToCart} />
    </ShopLayout>
  );
}