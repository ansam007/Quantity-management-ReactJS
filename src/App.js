import React, { useState, useContext } from "react";
import DataEntry from "./components/DataEntry/DataEntry";
import Cart from "./components/Cart/Cart";
import ContextProvider from "./components/context/create-context";

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
    <React.Fragment>
      {showCart && <Cart onClose={hideCartHandler}></Cart>}
      <button
        style={{
          position: "absolute",
          right: 20,
        }}
        onClick={showCartHandler}
      >
        Cart <span>{ctx.count}</span>
      </button>
      <DataEntry></DataEntry>
    </React.Fragment>
  );
}

export default App;
