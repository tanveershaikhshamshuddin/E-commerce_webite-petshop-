import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer, orderReducer } from './reducer/cartReducer';
import Cookie from "js-cookie";
import { addProductDetailsReducer,
    deleteProductDetailsReducer,
    getProductsDetailsReducer,
    getSearchHintReducer,
    productDetailsReducers, productListReducers, 
    searchProductDetailsReducer, updateProductDetailsReducer} from './reducer/productReducers';
        
import { userRegisterReducer, userSigninReducer } from './reducer/userReducer';

const cartItems=JSON.parse(localStorage.getItem("cartItems"))|| [];
//const userInfo=Cookie.getJSON("userInfo") || null;
const userInfo=JSON.parse(localStorage.getItem("userInfo")) || null;

const initialState={cart:{cartItems},userSignin:{userInfo}};
const reducer=combineReducers({
    productList:productListReducers,
    productDetails:productDetailsReducers,
    cart:cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    addProductDetails:addProductDetailsReducer,
    searchProductDetails:searchProductDetailsReducer,
    updateProductDetails:updateProductDetailsReducer,
    deleteProductDetails:deleteProductDetailsReducer,
    getProductsDetails:getProductsDetailsReducer,
    getSearchHints:getSearchHintReducer,
    order:orderReducer
})
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));
export  default store ;