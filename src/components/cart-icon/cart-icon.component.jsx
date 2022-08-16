import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.style.scss';

const CartIcon = () => {
  const {  isCartOpen ,setIsCartOpen, totalQuantity } = useContext(CartContext);


  console.log(`totalQuantity ${totalQuantity}`)

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  }


  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{totalQuantity}</span>
    </div>
  );
}

export default CartIcon;
