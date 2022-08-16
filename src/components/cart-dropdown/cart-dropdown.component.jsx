import Button from '../button/button.component';
import CardItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  console.log(`CartItems from cart-dropdown.component:
  ${cartItems}`)
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
