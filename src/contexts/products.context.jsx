import { useState, createContext } from 'react';
// import PRODUCTS from './../shop-data.json';

import PRODUCTS from '../shop-data.json';

export const ProductsContent = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  return (
    <ProductsContent.Provider value={value}>
      {children}
    </ProductsContent.Provider>
  );
};
