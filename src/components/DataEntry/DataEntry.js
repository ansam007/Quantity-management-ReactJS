import React, { useState, useContext } from "react";
import ContextProvider from "../context/create-context";
import ProductList from "./ProductList";

const DataEntry = (props) => {
  const ctx = useContext(ContextProvider);

  const [medicine, setMedicine] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  const medicineHandler = (event) => {
    setMedicine(event.target.value);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const priceHandler = (event) => {
    setPrice(event.target.value);
  };

  const amountHandler = (event) => {
    setAmount(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    ctx.storeItem({
      medicine: medicine,
      description: description,
      price: price,
      amount: amount,
    });

    setMedicine("");
    setDescription("");
    setPrice("");
    setAmount("");
  };

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        <label htmlFor="medicineName">Medicine Name</label>
        <input
          type="text"
          id="medicineName"
          value={medicine}
          onChange={medicineHandler}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={descriptionHandler}
        />
        <label htmlFor="price">Price</label>
        <input type="number" id="price" value={price} onChange={priceHandler} />
        <label htmlFor="quantityAvailable">Quantity Available</label>
        <input
          type="number"
          id="quantityAvailable"
          value={amount}
          onChange={amountHandler}
        />
        <button type="submit">Add Product</button>
      </form>
      <ProductList></ProductList>
    </React.Fragment>
  );
};

export default DataEntry;
