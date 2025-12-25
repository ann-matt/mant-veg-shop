import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type ApiProduct = {
  id: number;
  name: string;
  price: number | string;
  image: string;
  category: string;
};

type ProductsState = {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

const DATA_URL =
  'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const res = await fetch(DATA_URL);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data: ApiProduct[] = await res.json();

    // нормализация ровно как у тебя
    const normalized: Product[] = data.map((p) => ({
      id: p.id,
      name: p.name,
      price: typeof p.price === 'string' ? Number(p.price) : p.price,
      image: p.image,
    }));

    return normalized;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default productsSlice.reducer;