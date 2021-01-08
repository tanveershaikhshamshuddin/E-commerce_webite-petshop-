import React, { useEffect, useState } from 'react'
import {Link,useHistory} from "react-router-dom";
import "./ProductScreen.css";
import { useSelector } from 'react-redux/lib/hooks/useSelector';
import { useDispatch } from 'react-redux/lib/hooks/useDispatch';
import { detailsProduct } from "../actions/productActions";
import { CircularProgress } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { addToCart } from '../actions/cartActions';

function ProductScreen(props) {
  const [qty,setQty]=useState(1);
  const productDetails=useSelector(state => state.productDetails);
  const {product,loading,error} = productDetails;
  const dispatch=useDispatch();
  const history=useHistory();

  const getCustomDate=(mydate)=>{
    const dte=new Date(mydate);
    const month=(dte.getMonth()+1)<10?("0"+(dte.getMonth()+1)):(dte.getMonth()+1)
    const date=(dte.getDate())<10?("0"+(dte.getDate())):(dte.getDate())
    const year=dte.getFullYear();
    console.log(year)
    const dt=year+"-"+month+"-"+date
    console.log(" dates from server  :",dt)
    return dt
  }
  
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    }
  }, []);

  const handleAddToCart=async (item)=>{
    await dispatch(addToCart(item,qty));
    history.push("/CartScreen"); 
  }
  
  
  return  <div classNameName="product_detail_page">
            <div><Link to="/">  Back to home page</Link></div>
            { loading ? <div><center><CircularProgress color="secondary"/></center></div>:
            error ? <div><center><b><u>Not Available</u></b></center></div>:
            (
              <>
                  <div className="product_details_page  flex-wrap col-lg-12 py-3 d-flex flex-row mt-1 ">
        <div className="details_view d-flex justify-content-center align-items-center col-lg-5 col-sm-12 d-flex">
                <img src={product.p_image} className="w-100 shadow-lg" alt=""/>
        </div>
        <div className="d-flex flex-column product_details_action col-lg-6 col-sm-12 card-body">
            <ul className="text-decoration-none">
            <li><h3 className="product_name">{product.p_name}</h3></li>
                <li><h6><Rating
                name="hover-feedback"
                precision={0.5}
                value={3.5}
                readOnly
                /></h6></li>
                <li><h5>Price : ${product.p_price}</h5></li>
                {(product.p_category==="medicines" || product.p_category==="foods")?
              <>
                <li><h5>Expiry date :{getCustomDate(product.p_exp_date)}</h5></li>
                <li><h5>Manufacturing date :{getCustomDate(product.p_manf_date)}</h5></li>
              </>
                
              :null  
              }
                <li><h5>Status :{product.p_quantity>0?"In Stock":"Out Of Stock"}</h5></li>
                <li><h5>Select Quantity </h5></li>
                
                <li className="d-flex  product_counter col-lg-6 col-sm-3">
                    <button id="decrement" onClick={()=>{
                      qty>0?setQty(qty-1):setQty(0)
                    }}className="col-lg-4"><strong>-</strong></button>
                    <input type="text"  className="col-lg-4" id="qty" value={qty}disabled/>
                    <button id="increment" onClick={()=>{
                      qty<product.p_quantity?setQty(qty+1):setQty(qty)
                    }}className="col-lg-4 "><strong>+</strong></button>
                </li><br/><br/>
                <li><button onClick={()=>handleAddToCart(product)} className="btn btn-primary text-light w-100" style={{backgroundColor:" purple",borderRadius:"5rem"}}>Add To Cart</button></li><br/><br/>
                  <li><h5>Description</h5><p className="text-secondary">{product.p_description}</p></li>
                <li></li>
            </ul>
        </div>    
    </div>
              </>
            )
             }
        </div>
    
}
export default ProductScreen
