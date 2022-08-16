import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './product-card.style.scss';

import Button from '../button/button.component';

const ProductCard = ({ products }) => {
  const { name, price, imageUrl } = products;
  const { addItemToCart, addQuantity } = useContext(CartContext);


  const addProductToCart = () => {
    // console.log('addProductToCart:', products);
    addItemToCart(products);
    addQuantity();
  };


  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType='inverted' onClick={addProductToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
