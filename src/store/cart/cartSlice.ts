import { createSlice } from '@reduxjs/toolkit';

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // добавить товар (если уже есть — увеличить qty)
    addToCart(state, action) {
      const { id, name, price, image, qty } = action.payload as CartItem;

      const existing = state.items.find((x) => x.id === id);
      if (existing) {
        existing.qty += qty;
      } else {
        state.items.push({ id, name, price, image, qty });
      }
    },

    // установить qty (если 0 — удалить)
    setQty(state, action) {
      const { id, qty } = action.payload as { id: number; qty: number };

      const item = state.items.find((x) => x.id === id);
      if (!item) return;

      if (qty <= 0) {
        state.items = state.items.filter((x) => x.id !== id);
      } else {
        item.qty = qty;
      }
    },
  },
});

export const { addToCart, setQty } = cartSlice.actions;
export default cartSlice.reducer;