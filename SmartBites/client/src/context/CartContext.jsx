import { createContext, useContext, useState } from 'react';
import { useToast } from '../components/Toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { addToast } = useToast();

  const addToCart = (item) => {
    const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
    setCartItems(prev => [...prev, newItem]);
    addToast(`Item added to cart successfully!`, 'success');
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    addToast('Cart cleared', 'info');
  };

  const cartItemsCount = cartItems.length;

  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      cartItemsCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}