//<--- Data Entry with useREducer --->//

// import React, { useReducer } from "react";
// import ProductList from "./ProductList";

// const initialState = {
//   medicine: "",
//   description: "",
//   price: "",
//   amount: "",
//   productList: [],
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "updateField":
//       return { ...state, [action.field]: action.value };
//     case "submitForm":
//       const newItem = {
//         medicine: state.medicine,
//         description: state.description,
//         price: state.price,
//         amount: state.amount,
//       };
//       return {
//         ...state,
//         medicine: "",
//         description: "",
//         price: "",
//         amount: "",
//         productList: [...state.productList, newItem],
//       };
//     default:
//       return state;
//   }
// };

// const DataEntry = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const updateField = (field, value) => {
//     dispatch({ type: "updateField", field, value });
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     dispatch({ type: "submitForm" });
//   };

//   return (
//     <React.Fragment>
//       <form onSubmit={submitHandler}>
//         <label htmlFor="medicineName">Medicine Name</label>
//         <input
//           type="text"
//           id="medicineName"
//           value={state.medicine}
//           onChange={(e) => updateField("medicine", e.target.value)}
//         />
//         <label htmlFor="description">Description</label>
//         <input
//           type="text"
//           id="description"
//           value={state.description}
//           onChange={(e) => updateField("description", e.target.value)}
//         />
//         <label htmlFor="price">Price</label>
//         <input
//           type="number"
//           id="price"
//           value={state.price}
//           onChange={(e) => updateField("price", e.target.value)}
//         />
//         <label htmlFor="quantityAvailable">Quantity Available</label>
//         <input
//           type="number"
//           id="quantityAvailable"
//           value={state.amount}
//           onChange={(e) => updateField("amount", e.target.value)}
//         />
//         <button type="submit">Add Product</button>
//       </form>
//       <ProductList productList={state.productList}></ProductList>
//     </React.Fragment>
//   );
// };

// export default DataEntry;



// <--- ProductContext with useState --->// 

// import React, { useState } from "react";
// import ContextProvider from "./create-context";

// const defaultCartState = {
//   items: [],
//   cartItems: [],
//   totalAmount: 0,
//   count: 0,
// };

// const ProvideContext = (props) => {
//   const [cartState, setCartState] = useState(defaultCartState);

//   const addItemToCartHandler = (item) => {
//     setCartState((prevState) => {
//       const existingItem = prevState.cartItems.find(
//         (cartItem) => cartItem.medicine === item.medicine
//       );

//       if (existingItem) {
//         const updatedCartItems = prevState.cartItems.map((cartItem) =>
//           cartItem.medicine === item.medicine
//             ? { ...cartItem, amount: cartItem.amount + 1 }
//             : cartItem
//         );

//         return {
//           ...prevState,
//           cartItems: updatedCartItems,
//           totalAmount: prevState.totalAmount + item.price,
//           count: prevState.count + 1,
//         };
//       } else {
//         return {
//           ...prevState,
//           cartItems: [...prevState.cartItems, { ...item, amount: 1 }],
//           totalAmount: prevState.totalAmount + item.price,
//           count: prevState.count + 1,
//         };
//       }
//     });
//   };

//   const storeItemHandler = (data) => {
//     setCartState((prevState) => {
//       const existingItemIndex = prevState.items.findIndex(
//         (item) => item.medicine === data.medicine
//       );

//       if (existingItemIndex !== -1) {
//         const existingItem = prevState.items[existingItemIndex];
//         const updatedItem = {
//           ...existingItem,
//           amount: Number(existingItem.amount) + Number(data.amount),
//         };
//         const updatedItems = [...prevState.items];
//         updatedItems[existingItemIndex] = updatedItem;

//         return { ...prevState, items: updatedItems };
//       } else {
//         const updatedItems = [...prevState.items, data];
//         return { ...prevState, items: updatedItems };
//       }
//     });
//   };

//   const decreaseQuantityHandler = (item) => {
//     setCartState((prevState) => {
//       const updatedItems = prevState.items.map((cartItem) => {
//         if (cartItem.medicine === item.medicine && cartItem.amount > 0) {
//           return { ...cartItem, amount: cartItem.amount - 1 };
//         }
//         return cartItem;
//       });

//       return { ...prevState, items: updatedItems };
//     });
//   };

//   const cartDecreaseHandler = (item) => {
//     setCartState((prevState) => {
//       const existingItemIndex = prevState.cartItems.findIndex(
//         (cartItem) => cartItem.medicine === item.medicine
//       );
//       const existingItem = prevState.cartItems[existingItemIndex];

//       let updatedTotalAmount = prevState.totalAmount - existingItem.price;
//       let updatedItems;

//       if (existingItem.amount === 1) {
//         updatedItems = prevState.cartItems.filter(
//           (cartItem) => cartItem.medicine !== item.medicine
//         );
//       } else {
//         const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
//         updatedItems = [...prevState.cartItems];
//         updatedItems[existingItemIndex] = updatedItem;
//       }

//       const updatedItemsArray = prevState.items.map((cartItem) => {
//         if (cartItem.medicine === item.medicine) {
//           return { ...cartItem, amount: cartItem.amount + 1 };
//         }
//         return cartItem;
//       });

//       return {
//         ...prevState,
//         cartItems: updatedItems,
//         totalAmount: updatedTotalAmount,
//         items: updatedItemsArray,
//         count: prevState.count - 1,
//       };
//     });
//   };

//   const cartIncreaseHandler = (item) => {
//     setCartState((prevState) => {
//       const updatedCartItems = prevState.cartItems.map((cartItem) =>
//         cartItem.medicine === item.medicine
//           ? { ...cartItem, amount: Number(cartItem.amount) + 1 }
//           : cartItem
//       );

//       const updatedItemsArray = prevState.items.map((cartItem) => {
//         if (cartItem.medicine === item.medicine && cartItem.amount > 0) {
//           return { ...cartItem, amount: Number(cartItem.amount) - 1 };
//         }
//         return cartItem;
//       });

//       const updatedTotalAmount = updatedCartItems.reduce(
//         (total, cartItem) => total + cartItem.price * cartItem.amount,
//         0
//       );

//       return {
//         ...prevState,
//         cartItems: updatedCartItems,
//         totalAmount: updatedTotalAmount,
//         items: updatedItemsArray,
//         count: prevState.count + 1,
//       };
//     });
//   };

//   const context = {
//     items: cartState.items,
//     cartItems: cartState.cartItems,
//     totalAmount: cartState.totalAmount,
//     count: cartState.count,
//     addItem: addItemToCartHandler,
//     storeItem: storeItemHandler,
//     decreaseQuantity: decreaseQuantityHandler,
//     cartDecrease: cartDecreaseHandler,
//     cartIncrease: cartIncreaseHandler,
//   };

//   return (
//     <ContextProvider.Provider value={context}>
//       {props.children}
//     </ContextProvider.Provider>
//   );
// };

// export default ProvideContext;
