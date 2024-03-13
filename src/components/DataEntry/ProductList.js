import React, { useContext } from "react";
import ContextProvider from "../context/create-context";
import classes from './ProductList.module.css';

const ProductList = () => {
 const ctx = useContext(ContextProvider);

 const addToCart = (product) => {
   ctx.addItem(product);
   ctx.decreaseQuantity(product);
 };

 return (
   <div className={classes['product-list']}>
     <ul>
       {ctx.items.map((product, index) => (
         <li key={index} className={classes['product-list-item']}>
           <div className={classes['item-details']}>
             <span className={classes['item-name']}>{product.medicine}</span>
             <span className={classes['item-description']}>{product.description}</span>
             <div className={classes['item-info']}>
               <span>Rs.{product.price}</span>
               <span>Quantity Available: {product.amount}</span>
             </div>
           </div>
           <button
             onClick={() => addToCart(product)}
             disabled={product.amount === 0}
             className={classes['product-button']}
           >
             Add to Cart
           </button>
         </li>
       ))}
     </ul>
   </div>
 );
};

export default ProductList;

