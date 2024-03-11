import React, { useState } from "react";
import DataEntry from "./components/DataEntry/DataEntry";
import ProvideContext from "./components/context/ProvideContext";
import Cart from "./components/Cart/Cart";

function App() {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };

  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <ProvideContext>
      {showCart && <Cart onClose={hideCartHandler}></Cart>}
        <button
          style={{
            position: "absolute",
            right: 20,
          }}
          onClick={showCartHandler}
        >
          Cart
        </button>
      <DataEntry></DataEntry>
    </ProvideContext>
  );
}

export default App;
