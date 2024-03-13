import React, { useContext } from "react";
import ContextProvider from "../context/create-context";
import Modal from "../Modal/Modal";
import classes from './Cart.module.css';

const Cart = (props) => {
 const ctx = useContext(ContextProvider);

 const addItem = (item) => {
   ctx.cartIncrease(item);
 };

 const decreaseItem = (item) => {
   ctx.cartDecrease(item);
 };

 return (
   <Modal>
     <div className={classes['cart-modal']}>
       <ul>
         {ctx.cartItems.map((item, index) => {
           const itemInItems = ctx.items.find(
             (i) => i.medicine === item.medicine
           );

           return (
             <li key={index}>
               <div className={classes['item-details']}>
                 <span className={classes['item-name']}>{item.medicine}</span>
                 <div className={classes['item-info']}>
                   <span>Rs.{item.price}</span>
                   <span>Quantity: {item.amount}</span>
                 </div>
               </div>
               {itemInItems && itemInItems.amount > 0 && (
                 <button onClick={() => addItem(item)} className={classes['cart-button']}>+</button>
               )}
               <button onClick={() => decreaseItem(item)} className={classes['cart-button']}>-</button>
             </li>
           );
         })}
       </ul>
       <div className={classes['total']}>
         <span>
           Total Cart Value: <b>Rs.{ctx.totalAmount}</b>
         </span>
       </div>
       <div>
         <button onClick={props.onClose} className={classes['close-button']}>Close</button>
       </div>
     </div>
   </Modal>
 );
};

export default Cart;

