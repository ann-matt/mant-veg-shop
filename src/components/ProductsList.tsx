import { useEffect } from 'react';
import { Alert, Loader, Stack } from '@mantine/core';
import ProdCard from './ProdCard.tsx';

import { useSelector, useDispatch } from 'react-redux';
import {fetchProducts} from '../store/products/productsSlice.ts';
import type { RootState, AppDispatch } from '../store/store.ts';


export default function ProductsList() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const productStatus = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);


  useEffect(() => {
    if(productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);
    

  if (productStatus === 'loading') {
    return (
      <Stack align="center" py="lg">
        <Loader />
      </Stack>
    );
  }

  if (productStatus === 'failed') {
    return (
      <Alert color="red" title="Не удалось загрузить товары">
        {error}
      </Alert>
    );
  }

  return (
    <>
      {products.map((product) => (
        <ProdCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
        />
      ))}
    </>
  );
}