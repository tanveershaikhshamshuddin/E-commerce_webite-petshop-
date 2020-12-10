import { ADD_TO_CART, CLEAR_CART, CLEAR_ORDER, CREATE_ORDER, ORDER_ERROR, REMOVE_FROM_CART } from "../constants/cartConstants";

export const cartReducer=(
    state={cartItems:JSON.parse(localStorage.getItem("cartItems")) || "[]"}
    ,action)=>{
    switch(action.type){
        case ADD_TO_CART:
            return {cartItems:action.payload.cartItems};
        case REMOVE_FROM_CART:
            return { cartItems:action.payload.cartItems};
        case CLEAR_CART:
            return {cartItems:[]}
        default:
            return state
    }
}
//chek this
export const orderReducer=(state={},action)=>{
    switch(action.type){
        case CREATE_ORDER:
            return {order:action.payload};
        case CLEAR_ORDER:
            return {order:null};
        case ORDER_ERROR:
            return {order_error:action.payload}
        default:
            return state
    }
}
