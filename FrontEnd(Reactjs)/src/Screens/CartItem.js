import { Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons'
import { Rating } from '@material-ui/lab'
import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';

import "./CartScreen.css";
function CartItem(props) {
  const dispatch=useDispatch();
    const product=props.product;
const handleRemoveFromCart=(item)=>{
    dispatch(removeFromCart(item));
}

const handleDecrement=(product)=>{
  if(product.count>1){
    dispatch(addToCart(product,-1))
  }
}
const handleIncrement=(product)=>{
  if(product.count<product.p_quantity){
    dispatch(addToCart(product,1))
  }
}
    return (
        <>
            
              <div className="col-md-5 col-lg-3 col-xl-3">
                <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                  <img className="img-fluid w-100 shadow"
                  style={{borderRadius:"0.5rem",height:"80%"}}
                    src={product.p_image}  alt={product.p_name}/>
                </div>
              </div>            
              <div className="col-md-7 col-lg-9 col-xl-9">
                <div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 style={{fontFamily:"'Times New Roman', Times, serif"}}>{product.p_name}</h4>
            

                      <small >
                        
                        <Rating
                        name="hover-feedback"
                        precision={0.5}
                        value={3.5}
                        style={{color:"orangered"}}
                        readOnly
                        /><br/>
                    </small>
                      
                    <p className="p_quantity" style={{height:"30px"}}>  
                        <button id="decrement" onClick={()=>handleDecrement(product)} className="col-lg-2"><strong>-</strong></button>
                        <input type="text" className="col-lg-2" id="qty" value={product.count} disabled/>
                        <button id="increment" onClick={()=>handleIncrement(product)} className="col-lg-2 "><strong>+</strong></button>
                    </p>
                    </div>
                    
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                                
                    <Button 
                    onClick={()=>handleRemoveFromCart(product)}
                    size="small" variant="contained"color="secondary" className="shadow" style={{outline:"none",outlineColor:"none",color:"white",fontFamily:"Times New Roman",backgrondColor:"crimson",borderRadius:"o.5rem"}}>
                    <Delete/>
                    <strong>Remove from Cart</strong>
                    </Button>
                    </div>
                      <p className="mb-0"><span><strong>${product.p_price}</strong></span></p>
                  </div>
                </div>
              </div>
            
        </>
    )
}

export default CartItem
