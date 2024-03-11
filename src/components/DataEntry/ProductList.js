import React, { useContext } from "react";
import ContextProvider from "../context/create-context";

const ProductList = () => {
  const ctx = useContext(ContextProvider);

  const addToCart = (product) => {
    ctx.addItem(product);
    ctx.decreaseQuantity(product);
  };

  return (
    <ul>
      {ctx.items.map((product, index) => (
        <li key={index}>
          {product.medicine} || {product.description} || Rs.{product.price} ||
          Quantity Available: {product.amount}
          <button
            onClick={() => addToCart(product)}
            disabled={product.amount === 0}
          >
            Add to Cart
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
