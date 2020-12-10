import React,{useState,useEffect} from 'react';
import axios from "axios";
import "./App.css";

import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import {BrowserRouter ,Route,Link, useHistory} from "react-router-dom"
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import store from './store';
import CartScreen from './Screens/CartScreen';
import Provider from 'react-redux/lib/components/Provider';
import SignInScreen from './Screens/SignInScreen';
import userRegisterScreen from './Screens/userRegisterScreen';
import ProductManageScreen from './Screens/productManagement/ProductManageScreen';
import SearchScreen from './Screens/SearchScreen';
import Specific_product from './Screens/Specific_product';

function App() {
  const [cartItems,setCartItems]=useState([]);

  const history=useHistory();
  return (
      <Provider store={store}>
      <BrowserRouter>
      <div className="grid-container">
        <Header/>
        <Sidebar/>
        <main className="main">
            <div className="">
              <Route path="/register" component={userRegisterScreen}/>
              <Route path="/signin" component={SignInScreen}/>
              <Route path="/product/:id" component={ProductScreen}/>
              <Route path="/" exact={true} component={HomeScreen}/>  
              <Route path="/CartScreen" component={CartScreen} />             
              <Route path="/product_manage" component={ProductManageScreen}/>
              <Route path="/specific_pet_products/:pet_type/:category" component={Specific_product}/>
              <Route path="/search_screen/:query" component={SearchScreen}/>
            </div>
        </main>
        
    </div>
    </BrowserRouter>
    </Provider>
  )
}

export default App;
