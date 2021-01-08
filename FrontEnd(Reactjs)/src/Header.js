import React, { useEffect, useRef, useState } from 'react'
import "./Header.css";
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import {BrowserRouter,BrowserRouter as Router,Route,Link, useHistory} from "react-router-dom";
import { useSelector } from 'react-redux/lib/hooks/useSelector';
import { MoreVert, ShoppingCart,AccountCircle } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import AutoCompleteItem from './AutoCompleteItem';


const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);
function Header(props) {
    const  cart=useSelector(state=>state.cart);
    const {cartItems}=cart;
    const userSignin=useSelector(state=>state.userSignin);
    const {userInfo}=userSignin;
    const [query,setQuery]=useState("");

    const openMenu=()=>{
        document.querySelector(".sidebar").classList.add("open");
      }
      const history=useHistory();
      const handleSearchClick=()=>{
        
          if(query){
            history.push(`/search_screen/${query}`);
            //alert("into");
            //props.history.push(`/search_screen/${query}`);
          }
      }
    return (
        <>
        <nav className="navbar  myheader navbar-expand-lg d-flex justify-content-between" style={{height:"4rem"}}>

    <div className="d-flex justify-content-center align-items-center">
    
            <button className="toggle_sidebar_btn" onClick={openMenu}>&#9776;</button>
            <img src="/images/my_shop_logo.png"height="60px" alt=""/>
    
  <Link class="navbar-brand" to="/" id="brand_name">Exotic pets</Link>
      </div>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
    <li class="nav-item">
      <div className="search_bar">
        <form onSubmit={handleSearchClick}>
          <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} autoComplete="off" placeholder="Search here"/>
          <button id="search_btn" type="submit"><img src="/images/search_icon.png" alt="" height="25px"/></button>
        </form>
          </div>
          <ul className="list-group">
          </ul>
      </li>
      <li className="nav-item">
      {
    userInfo?<><Link to="/user/profile" style={{textDecoration:"none"}}>
<IconButton aria-label="cart" className="ml-auto" style={{border:"none",color:"white",outline:"none",backgroundColor:"purple",borderRadius:"0.5rem",outlineColor:"none",fontSize:"15px"}}>
<AccountCircle color="white"/>
{userInfo.name}
</IconButton>
</Link>

{
  userInfo.isAdmin===true?
  <button className="sgnbtn nav-item m-1"><Link to="/product_manage">Manage Your product</Link></button>
  :null
}
</>

    : <button className="sgnbtn nav-item m-1"><Link to="/signin">Sign In</Link></button>
}
      </li>
    </ul>
  </div>
    <div  className="d-flex flex-row"style={{position:"absolute",right:"0.4rem"}}>  
           
    <IconButton onClick={()=>history.push("/CartScreen")}aria-label="cart" className="ml-auto" style={{outline:"none",backgroundColor:"transparent",outlineColor:"none",border:"none"}}>
  <StyledBadge badgeContent={cartItems!==0?cartItems.length:"0"} color="secondary">
    <ShoppingCart style={{color:"purple"}}/>
  </StyledBadge>
</IconButton> 

<button class="navbar-toggler" style={{outline:"none",backgroundColor:"transparent",outlineColor:"none",border:"none"}} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <MoreVert/>
  </button>
    </div>
</nav>
        </>
    )
}

export default Header
