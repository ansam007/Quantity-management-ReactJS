import React, { useContext } from "react";
import ContextProvider from "../context/create-context";
import Modal from "../Modal/Modal";

const Cart = (props) => {
  const ctx = useContext(ContextProvider);

  const addItem = (item) => {
    ctx.cartIncrease(item);
  }

  const decreaseItem = (item) => {
    ctx.cartDecrease(item);
  }

  return (
    <Modal>
      <ul>
        {ctx.cartItems.map((item, index) => (
          <li key={index}>
            {item.medicine} || Rs.{item.price} ||
            Quantity: {item.amount}
            <button onClick={() => addItem(item)}>+</button>
            <button onClick={() => decreaseItem(item)}>-</button>
          </li>
        ))}
      </ul>
        <div>
          <span>Total Cart Value: <b>Rs.{ctx.totalAmount}</b></span>
        </div>
        <div>
          <button onClick={props.onClose}>Close</button>
        </div>
    </Modal>
  );
};

export default Cart;




