import { createContext, useState, useEffect } from 'react';
const addCartItem = (cartItems, productToAdd) => {
  console.log(cartItems);
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

const deleteCartItem = (cartItems, deleteProductFromCart) => {
  const ifExist = cartItems.find(
    (cartItem) => cartItem.id === deleteProductFromCart.id
  );

  if (ifExist) {
    return cartItems.filter(
      (cartItem) => cartItem.id !== deleteProductFromCart.id
    );
  }
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  console.log(`cartItemToRemove: ${cartItemToRemove}`);
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  //check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);

    /*filter makes a new array so it will return a new array to render again*/
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  totalQuantity: 0,
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  total:0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState();

  // Use effect is triggered when some value update
  useEffect(() => {
    const count = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setTotalQuantity(count);
  }, [cartItems]);

  useEffect(() => {
    const totalAmount = cartItems.reduce(
      (allAmount, cartItem) => allAmount + cartItem.quantity * cartItem.price,0
    );
    setTotalPrice(totalAmount);
  }, [cartItems]);

  const addQuantity = () => {
    setTotalQuantity(totalQuantity);
  };

  const deleteItemFromCart = (itemToDelete) => {
    setCartItems(deleteCartItem(cartItems, itemToDelete));
  };

  console.log(`totalQuantity ${totalQuantity}`);

  // input is taken from product-card.component
  // further we are also inputting products
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    addItemToCart,
    totalQuantity,
    addQuantity,
    removeItemFromCart,
    deleteItemFromCart,
    totalPrice,
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
