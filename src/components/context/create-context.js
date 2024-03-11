import React from "react";

const ContextProvider = React.createContext({
  items: [],
  cartItems: [],
  totalAmount: 0,
  addItem: () => {},
  storeItem: () => {},
  decreaseQuantity: () => {},
});

export default ContextProvider;
