import { createContext, useState, useEffect } from 'react';
const addCartItem = (cartItems, productToAdd) => {
  // find if cart items contains product to add
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if found increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        : cartItem
    );
  }
  //return new array with modified cartItems/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  totalQuantity: 0,
});

const totalItems = (totalQuantity) => {
 return(totalQuantity + 1);
}

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // useEffect(() => {
  //   setTotalQuantity(totalQuantity + 1);
  // }, [cartItems]);

  const addQuantity = () => {
    setTotalQuantity(totalItems(totalQuantity));
  }

  console.log(`totalQuantity ${totalQuantity}`)

  // input is taken from product-card.component
  // further we are also inputting products
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    addItemToCart,
    totalQuantity,
    addQuantity,
  };
  // console.log(`cartItems ${cartItems}`);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 *
 * Product: {
 *  id,
 *  name,
 *  price,
 *  imageUrl
 * }
 *
 *
 * Cart Items: {
 *  id,
 *  name,
 *  price,
 *  imageUrl,
 *  quantity
 * }
 *
 */
