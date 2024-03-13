import React, { useState, useContext } from "react";
import ContextProvider from "../context/create-context";
import ProductList from "./ProductList";
import classes from "./DataEntry.module.css";

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
    if (medicine && description && price && amount) {
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
    } else {
      alert("Please fill the data completely");
    }
  };

  return (
    <div className={classes["data-entry"]}>
      <form onSubmit={submitHandler} className={classes["form"]}>
        <label htmlFor="medicineName" className={classes["label"]}>
          Medicine Name
        </label>
        <input
          type="text"
          id="medicineName"
          value={medicine}
          onChange={medicineHandler}
          className={classes["input"]}
        />
        <label htmlFor="description" className={classes["label"]}>
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={descriptionHandler}
          className={classes["input"]}
        />
        <label htmlFor="price" className={classes["label"]}>
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={priceHandler}
          className={classes["input"]}
        />
        <label htmlFor="quantityAvailable" className={classes["label"]}>
          Quantity Available
        </label>
        <input
          type="number"
          id="quantityAvailable"
          value={amount}
          onChange={amountHandler}
          className={classes["input"]}
        />
        <button type="submit" className={classes["submit-button"]}>
          Add Product
        </button>
      </form>
      <ProductList></ProductList>
    </div>
  );
};

export default DataEntry;
