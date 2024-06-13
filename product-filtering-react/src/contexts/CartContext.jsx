import React, { createContext, useContext } from "react";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children, handleCartLength }) => {
  return (
    <CartContext.Provider value={{ handleCartLength }}>
      {children}
    </CartContext.Provider>
  );
};
