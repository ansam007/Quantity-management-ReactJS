import React, { useState, useContext } from "react";
import DataEntry from "./components/DataEntry/DataEntry";
import Cart from "./components/Cart/Cart";
import ContextProvider from "./components/context/create-context";
import classes from './App.module.css';

function App() {
  const [showCart, setShowCart] = useState(false);

  const ctx = useContext(ContextProvider);

  const showCartHandler = () => {
    setShowCart(true);
  };

  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <div className={classes.app}>
      {showCart && <Cart onClose={hideCartHandler}></Cart>}
      <button
        className={classes["cart-button"]}
        onClick={showCartHandler}
      >
        Cart <span>{ctx.count}</span>
      </button>
      <DataEntry></DataEntry>
    </div>
  );
}

export default App;