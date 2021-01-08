import { ADD_TO_CART, CLEAR_CART, CLEAR_ORDER, CREATE_ORDER, ORDER_ERROR, REMOVE_FROM_CART } from "../constants/cartConstants";
import axios from "axios";
export const addToCart=(product,qty)=>(dispatch,getState)=>{
    const cartItems=getState().cart.cartItems.slice();
    let alreadyExist=false;
    cartItems.forEach(x=>{
        if(x._id===product._id){
            alreadyExist=true;
            x.count=x.count+(qty)
        }
    });
    if(!alreadyExist){
        cartItems.push({...product,count:qty});
    }
    dispatch({
        type:ADD_TO_CART,
        payload:{cartItems}
    });
    
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
}

export const removeFromCart=(product)=>(dispatch,getState)=>{

    const cartItems=getState().cart.cartItems.slice().filter((x)=> x._id !==product._id)

    dispatch({
        type:REMOVE_FROM_CART,
        payload:{cartItems}
    })
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
}

export const createOrder=(order)=>async(dispatch)=>{
    try{
        const {data}=await axios.post("/api/orders/",order);
        console.log("Message from server",data.message);
        dispatch({
            type:CREATE_ORDER,
            payload:data.message
        })
        localStorage.removeItem("cartItems");
        dispatch({
            type:CLEAR_CART,
        })
    }catch(e){
        dispatch({
            type:ORDER_ERROR,
            payload:e.response && e.response.data.message ? e.response.data.message :e.message
        })
    }
}

export const clearOrder=()=>(dispatch)=>{
    dispatch({
        type:CLEAR_ORDER
    });
}