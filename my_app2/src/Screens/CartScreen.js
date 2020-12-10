import { BorderBottom, HighlightOff, Receipt } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from "react-router-dom";
import CartItem from './CartItem';
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom"
import "./CartScreen.css";
import CheckOutStepper from './CheckOutStepper';
import Modal from "react-modal";
import { Card } from '@material-ui/core';
import { clearOrder } from '../actions/cartActions';
function CartScreen() {
    const cart=useSelector(state=>state.cart);
    const {cartItems}=cart
    const [total,setTotal]=useState(0);
    const dispatch=useDispatch();

    const closeModal=()=>{
      dispatch(clearOrder())
    }



    const orders=useSelector(state=>state.order);
    const {order,order_error}=orders;


    const history=useHistory();
    const userSignin=useSelector(state=>state.userSignin);
    const {loading,userInfo,error}=userSignin

    const [islogin,setIsLogin]=useState(false);

    function calTotal(){
      const amount=cartItems.reduce((a,c)=> a+c.p_price*c.count,0);
      const tax=0.15;
      const Total=amount+(tax*amount)
      setTotal(Total)
    }

    useEffect(() => {
      calTotal();
    }, [cartItems]);

    useEffect(() => {
      if(order_error){
        console.log("Error While giving Order :",order_error);
      }else{
        if(order){
          console.log("Order Details :",order);
        }
      }
    }, [order])

    const handleCheckOut=()=>{
      if(userInfo){
        setIsLogin(true);
      }else{
        setIsLogin(false);
        history.push("/signin")
      }
      console.log("All Cart Items :",cartItems);
    }
    return (
        <div>         
    <div className="container-fluid mt-1">    
<section>
    <div className="row">
      
      <div className="col-lg-8 ">
        
        <div className="card wish-list mb-3 shadow">
          <div className="card-body">
  
            {
                cartItems.length!==0?(
                    <h5 className="mb-4">Cart is Empty</h5>
                ):(
                    <h5 className="mb-4">Cart (<span>{cartItems.length}</span> items)</h5>

                )
            }
            {
              order && <Modal isOpen={true}
              onRequestClose={closeModal}
              >
                  <Zoom>
                  
                  
          <div className="container-fluid" id="receipt">
            <h2 className="mt-2 col-12 text-light p-3" style={{backgroundColor:"purple"}} >Exotic pets World
            <button className="menu_close_btn float-left text-light" 
            style={{border:"none",position:"absolute",right:"2rem",fontSize:"1.3rem",backgroundColor:"transparent"}} 
            onClick={closeModal}>
              <HighlightOff className="sidebar_icon"/>
              </button></h2>

            <p className="card col-12 mt-2"><h4>Payment Mode</h4>{order.o_payment_method}</p>            
            <p className="card col-12 mt-2"><h4>Shipping Address</h4>{order.o_shipping_addr}</p>            
            <table className="table mt-2 table-hover">
              <thead className="bg-primary text-light">
                <tr>
                  <th></th>
                  <th>PRODUCT NAME</th>
                  <th>PRODUCT PRICE</th>
                  <th>PRODUCT QUANTITY</th>
                  <th>PRODUCT TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {
                  order.o_cartItems.map((item,index)=>(
                    <>
                    <tr>
                  <td>{index}</td>
                  <td>{item.p_name}</td>
                  <td>{item.p_price}</td>
                  <td>{item.count}</td>
                  <td>{item.p_price *item.count}</td>
                    </tr>
                    </>
                  ))
                }
              </tbody>
            </table>

            <div className="p-2 mt-2 card">
              
            <div className="subtotal p-2" >
              <strong>Subtotal : ${order.o_cartItems.reduce((a,c)=>a+c.p_price*c.count,0)}{""}</strong>
            </div>
            <div className="sales-tax">
              <strong>Tax included : 15%</strong>
            </div>
            <div className="total">
              <h5 className="total"><strong>
                Total amount with 15% Tax : ${order.o_total}
                </strong></h5>
            </div>
            <div className="card p-2 mt-2">
              <h5 className="text-danger"><strong>ORDER ID :- {order._id}</strong></h5>
            </div>
            <div>
              <button className="btn btn-primary shadow" id="receiptbtn" style={{borderRadius:"1.5rem",margin:"1rem",positon:"relative",float:"right"}} >Download Receipt</button>
            </div>
            </div>
          </div>
                  </Zoom> 
              </Modal>
            }
            <hr/>
            {
                cartItems.map((item,index)=>(
                  <Fade right  delay={1300}>
                  <div className="row mb-4" key={index} style={{BorderBottom:"2px solid lightgray"}}>
                    <CartItem product={item}/>
                    <hr/>
                    </div>
                    </Fade>
                )
                )  
                
            }
            

          </div>
        </div>
        
      </div>

{
    cartItems.length!==0 && (
      <div className="col-lg-4">
      <div className="card mb-3 shadow" >
        <div className="card-body">
          <h5 className="mb-3">Summary of Cart</h5>
          <hr/>
          <Fade bottom cascade>
          <ul className="list-group list-group-flush" style={{color:"purple",fontSize:"0.95rem",fontFamily:"'Times New Roman', Times, serif"}}>
            {
              cartItems.map((item,index)=>(
                <li class="list-group-item d-flex justify-content-between align-items-center" key={index}>
                {item.p_name} ({item.count})x(${item.p_price})
                <span class="badge badge-warning badge-pill">${item.count * item.p_price}</span>
              </li>
              ))
            }
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Total amount :              
          <span> {            
            <span className="badge badge-primary badge-pill"> ${             
              (cartItems.reduce((a,c)=> a+c.p_price*c.count,0)).toString()
            }</span>              
          }
          </span>         
            </li>
          </ul>
          </Fade>
          <button type="button" 
          onClick={handleCheckOut}
           className="btn mt-3 shadow w-100 text-light"
            style={{borderRadius:"1rem",backgroundColor:"purple"}}
          >
          Proceed To CheckOut
          </button>
        </div>
      </div>
      {islogin &&<Fade right cascade> <Card className="shadow"><CheckOutStepper total={total} cartItems={JSON.stringify(cartItems)} user_name={userInfo.name} user_email={userInfo.email}/></Card></Fade>}
    </div>
    )
}
    </div>
  </section>
    </div>
        </div>
    )
}

export default CartScreen
