import { ProductsContent } from '../../contexts/products.context';
import { useContext } from 'react';

import ProductCard from '../../components/product-card/product-card.component';

import './shop.styles.scss';

const Shop = () => {
  const {products} = useContext(ProductsContent);
  console.log(products)
  return (
    <div className='products-container'>
      {products.map((product) => {
        return(
          <ProductCard key={product.id} products={product}></ProductCard>
        )
      })}
    </div>
  );
}

export default Shop;
