import React, { useReducer } from "react";
import ContextProvider from "./create-context";

const defaultCartState = {
  items: [],
  cartItems: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "STORE") {
    return { ...state, items: [...state.items, action.item] };
  }

  if (action.type === "ADD") {
    const existingItem = state.cartItems.find(
      (item) => item.medicine === action.item.medicine
    );

    let updatedCartItems;

    if (existingItem) {
      updatedCartItems = state.cartItems.map((item) =>
        item.medicine === action.item.medicine
          ? { ...item, amount: item.amount + 1 }
          : item
      );
    } else {
      updatedCartItems = [...state.cartItems, { ...action.item, amount: 1 }];
    }

    const updatedTotalAmount = updatedCartItems.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );

    return {
      ...state,
      cartItems: updatedCartItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "DECREASE") {
    const updatedItems = state.items.map((item) => {
      if (item.medicine === action.item.medicine) {
        if (item.amount > 0) {
          return { ...item, amount: item.amount - 1 };
        }
      }
      return item;
    });

    return { ...state, items: updatedItems };
  }

  if (action.type === "CARTDECREASE") {
    const existingItemIndex = state.cartItems.findIndex(
      (item) => item.medicine === action.item.medicine
    );

    const existingItem = state.cartItems[existingItemIndex];

    let updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.cartItems.filter(
        (item) => item.medicine !== action.item.medicine
      );
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.cartItems];
      updatedItems[existingItemIndex] = updatedItem;
    }

    const updatedItemsArray = state.items.map((item) => {
      if (item.medicine === action.item.medicine) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });

    return {
      ...state,
      cartItems: updatedItems,
      totalAmount: updatedTotalAmount,
      items: updatedItemsArray,
    };
  }

  if (action.type === "CARTINCREASE") {
    const existingItemIndex = state.cartItems.findIndex(
      (item) => item.medicine === action.item.medicine
    );

    const existingItem = state.cartItems[existingItemIndex];

    const updatedItems = state.cartItems.map((item) =>
      item.medicine === action.item.medicine
        ? { ...item, amount: Number(item.amount) + 1 }
        : item
    );

    const updatedItemsArray = state.items.map((item) => {
      if (item.medicine === action.item.medicine) {
        return { ...item, amount: Number(item.amount) - 1 };
      }
      return item;
    });

    const updatedTotalAmount = updatedItems.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );

    return {
      ...state,
      cartItems: updatedItems,
      totalAmount: updatedTotalAmount,
      items: updatedItemsArray,
    };
  }

  return state;
};

const ProvideContext = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const storeItemHandler = (data) => {
    dispatchCartAction({ type: "STORE", item: data });
  };

  const decreaseQuantityHandler = (item) => {
    dispatchCartAction({ type: "DECREASE", item: item });
  };

  const cartDecreaseHandler = (item) => {
    dispatchCartAction({ type: "CARTDECREASE", item: item });
  };

  const cartIncreaseHandler = (item) => {
    dispatchCartAction({ type: "CARTINCREASE", item: item });
  };

  const context = {
    items: cartState.items,
    cartItems: cartState.cartItems,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    storeItem: storeItemHandler,
    decreaseQuantity: decreaseQuantityHandler,
    cartDecrease: cartDecreaseHandler,
    cartIncrease: cartIncreaseHandler,
  };

  return (
    <ContextProvider.Provider value={context}>
      {props.children}
    </ContextProvider.Provider>
  );
};

export default ProvideContext;
